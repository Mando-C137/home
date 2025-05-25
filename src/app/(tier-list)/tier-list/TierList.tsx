"use client";
import React, { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  useDroppable,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";

const tiers = ["S", "A", "B", "C", "D", "E", "F", "NOT_WATCHED"] as const;
type Tier = (typeof tiers)[number];

interface TierItem {
  id: string | number;
  title: string;
  url: string;
}

interface TierListProps {
  movies: TierItem[];
  initialData: Record<Tier, TierItem["id"][]>;
}

interface SortableItemProps {
  id: string | number;
  url: string;
  title: string;
  isDraggedItem?: boolean;
  isInPreviewPosition?: boolean;
}

function SortableItem({
  id,
  title,
  url,
  isDraggedItem = false,
  isInPreviewPosition = false,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    opacity: isDragging ? 0.3 : isInPreviewPosition ? 0.6 : 1,
  };

  return (
    <Image
      ref={setNodeRef}
      style={{ ...style }}
      width={80}
      height={128}
      className="h-[128px]"
      {...attributes}
      {...listeners}
      src={url}
      alt={title}
    />
  );
}

function PlaceholderItem({
  id,
  draggedItem,
  showPreview,
}: {
  id: string;
  draggedItem?: TierItem | null;
  showPreview?: boolean;
}) {
  const { setNodeRef, isOver } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className="m-1 flex h-[128px] w-20 items-center justify-center"
      style={
        {
          // background: isOver ? "#e0e7ff" : undefined,
        }
      }
    >
      {showPreview && draggedItem ? (
        <Image
          src={draggedItem.url}
          alt={draggedItem.title}
          width={80}
          height={128}
          className="h-[128px] opacity-60"
        />
      ) : null}
    </div>
  );
}

function TierRow({
  tier,
  children,
}: {
  tier: Tier;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
  });

  return (
    <div
      ref={setNodeRef}
      className="m-0 flex min-h-[128px] min-w-[40rem] items-center bg-stone-900 p-0 transition-all duration-200"
      style={{
        // background: isOver ? "#e0e7ff" : undefined,
        borderRadius: 6,
      }}
    >
      <div className={`w-16 text-center ${TierConstants[tier].color} `}>
        <div className="flex h-[128px] w-16 flex-col items-stretch justify-center text-clip text-wrap text-sm text-black">
          {TierConstants[tier].name}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function TierList({ initialData, movies }: TierListProps) {
  const [itemsByTier, setItemsByTier] =
    useState<Record<Tier, TierItem["id"][]>>(initialData);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  // Memoize stable sortable contexts to prevent re-renders
  const stableSortableItems = useMemo(() => {
    const result: Record<Tier, (string | number)[]> = {} as Record<
      Tier,
      (string | number)[]
    >;

    for (const tier of tiers) {
      const items = itemsByTier[tier];
      if (items.length === 0) {
        result[tier] = [`placeholder-${tier}`];
      } else {
        result[tier] = items;
      }
    }

    return result;
  }, [itemsByTier]);

  function findTierByItemId(id: string): Tier | undefined {
    for (const tier of tiers) {
      if (itemsByTier[tier].some((x) => x === id)) return tier;
    }
    return undefined;
  }

  function getDraggedItem(): TierItem | null {
    if (!activeId) return null;
    return movies.find((movie) => movie.id === activeId) ?? null;
  }

  function getPreviewState(tier: Tier) {
    if (!activeId || !overId) {
      return {
        items: itemsByTier[tier],
        previewPositions: new Set<string | number>(),
        showPlaceholderPreview: false,
      };
    }

    const draggedItem = activeId;
    const fromTier = findTierByItemId(draggedItem);
    if (!fromTier) {
      return {
        items: itemsByTier[tier],
        previewPositions: new Set<string | number>(),
        showPlaceholderPreview: false,
      };
    }

    // Handle placeholder drops
    if (overId === `placeholder-${tier}`) {
      return {
        items: itemsByTier[tier],
        previewPositions: new Set<string | number>(),
        showPlaceholderPreview: true,
      };
    }

    // Handle tier drops (dropping on tier background)
    if (overId === tier) {
      if (tier === fromTier) {
        // Same tier, show preview at end
        const previewPositions = new Set<string | number>();
        if (itemsByTier[tier].length > 1) {
          previewPositions.add(draggedItem);
        }
        return {
          items: itemsByTier[tier],
          previewPositions,
          showPlaceholderPreview: false,
        };
      } else {
        // Different tier, no preview needed (will show in drag overlay)
        return {
          items: itemsByTier[tier],
          previewPositions: new Set<string | number>(),
          showPlaceholderPreview: false,
        };
      }
    }

    // Handle item drops
    const overTier = findTierByItemId(overId);
    if (overTier === tier && tier === fromTier) {
      // Same tier reordering - show preview
      const previewPositions = new Set<string | number>();
      previewPositions.add(draggedItem);
      return {
        items: itemsByTier[tier],
        previewPositions,
        showPlaceholderPreview: false,
      };
    }

    return {
      items: itemsByTier[tier],
      previewPositions: new Set<string | number>(),
      showPlaceholderPreview: false,
    };
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId((event.over?.id as string) || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;
    if (active.id === over.id) return;

    const fromTier = findTierByItemId(active.id as string);
    if (!fromTier) return;

    // If dropped over a tier row (not an item), append to end of that tier
    let toTier: Tier | undefined;
    let toIndex: number | undefined;

    // If dropped over a placeholder (empty tier), over.id === `placeholder-${tier}`
    if (typeof over.id === "string" && over.id.startsWith("placeholder-")) {
      toTier = over.id.replace("placeholder-", "") as Tier;
      toIndex = 0;
    } else if (tiers.includes(over.id as Tier)) {
      toTier = over.id as Tier;
      toIndex = itemsByTier[toTier].length;
    } else {
      // Dropped over an item
      toTier = findTierByItemId(over.id as string);
      if (!toTier) return;
      const overIndex = itemsByTier[toTier].findIndex((x) => x === over.id);
      if (overIndex === -1) {
        toIndex = itemsByTier[toTier].length;
      } else {
        // If dropping over the last item, insert at the end
        if (overIndex === itemsByTier[toTier].length - 1) {
          toIndex = itemsByTier[toTier].length;
        } else {
          toIndex = overIndex;
        }
      }
    }

    // If same tier and position, do nothing
    if (fromTier === toTier) {
      const oldIndex = itemsByTier[fromTier].findIndex((x) => x === active.id);
      if (oldIndex === toIndex || oldIndex === -1) return;
      setItemsByTier((prev) => ({
        ...prev,
        [fromTier]: arrayMove(prev[fromTier], oldIndex, toIndex),
      }));
      return;
    }

    // Move item between tiers
    const fromList = [...itemsByTier[fromTier]];
    const toList = [...itemsByTier[toTier]];

    const draggedIndex = fromList.findIndex((x) => x === active.id);
    if (draggedIndex === -1) return;

    const [draggedItem] = fromList.splice(draggedIndex, 1);
    toList.splice(toIndex, 0, draggedItem!);

    setItemsByTier({
      ...itemsByTier,
      [fromTier]: fromList,
      [toTier]: toList,
    });
  }

  const draggedItem = getDraggedItem();

  return (
    <div className="flex flex-col gap-2">
      <DndContext
        id={"tier-list"}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {tiers.map((tier) => {
          const { items, previewPositions, showPlaceholderPreview } =
            getPreviewState(tier);

          return (
            <TierRow key={tier} tier={tier}>
              <SortableContext
                items={stableSortableItems[tier]}
                strategy={verticalListSortingStrategy}
              >
                {items.length === 0 ? (
                  <PlaceholderItem
                    id={`placeholder-${tier}`}
                    draggedItem={draggedItem}
                    showPreview={showPlaceholderPreview}
                  />
                ) : (
                  items.map((item) => {
                    const movie = movies.find((movie) => movie.id === item)!;
                    const isDraggedItem = activeId === item;
                    const isInPreviewPosition = previewPositions.has(item);

                    return (
                      <SortableItem
                        key={item}
                        id={item}
                        url={movie.url}
                        title={movie.title}
                        isDraggedItem={isDraggedItem}
                        isInPreviewPosition={isInPreviewPosition}
                      />
                    );
                  })
                )}
              </SortableContext>
            </TierRow>
          );
        })}
        <DragOverlay>
          {activeId ? (
            <Image
              src={movies.find((movie) => movie.id === activeId)!.url}
              alt={movies.find((movie) => movie.id === activeId)!.title}
              width={80}
              height={128}
              className="h-[128px]"
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

const TierConstants: Record<Tier, { color: string; name: string }> = {
  S: { color: "bg-[rgb(255,127,127)]", name: "S" },
  A: { color: "bg-[rgb(255,191,127)]", name: "A" },
  B: { color: "bg-[rgb(255,223,127)]", name: "B" },
  C: { color: "bg-[#FFFF7F]", name: "C" },
  D: { color: "bg-[rgb(191,255,127)]", name: "D" },
  E: { color: "bg-[rgb(127,255,127)]", name: "E" },
  F: { color: "bg-[rgb(127,255,255)]", name: "F" },
  NOT_WATCHED: { color: "bg-gray-200", name: "Not seen" },
};
