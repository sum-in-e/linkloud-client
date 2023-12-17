'use client';

import LinkItem from '@/features/link/containers/LinkListQueryResult/common/LinkList/LinkItem/LinkItem';
import { LinkInfoType } from '@/features/link/modules/apis/link';
import { useEffect, useRef, useState } from 'react';

interface Props {
  link: LinkInfoType;
  isEditMode: boolean;
  onSelectItem: (id: number) => void;
  isSelected: boolean;
}

/**
 * 컴포넌트가 화면에 노출되는지 체크하고 화면에 보여지는 경우 Image priority를 true로, 화면에 보이지 않는 경우 Image를 지연 로딩하도록 구분해주는 provider입니다. (목적: 페이지 성능 최적화)
 */
export default function LinkItemPriorityProvider({
  link,
  isEditMode,
  isSelected,
  onSelectItem,
}: Props) {
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [shouldPriority, setShouldPriority] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setShouldPriority(true);
      }
      setIsLoading(false);
      observer.disconnect();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isLoading ? (
        <div className="mb-14">
          <div className="skeleton aspect-[1.91/1] h-auto w-full rounded-lg" />
          <div className="p-2 pt-4">
            <div className="skeleton mb-3 h-3 w-full rounded-xl" />
            <div className="skeleton mb-1 h-4 w-1/3 rounded-xl" />
            <div className="skeleton h-3 w-full rounded-xl" />
          </div>
        </div>
      ) : (
        <LinkItem
          key={link.id}
          link={link}
          isEditMode={isEditMode}
          isSelected={isSelected}
          onSelectItem={onSelectItem}
          priority={shouldPriority}
        />
      )}
    </div>
  );
}
