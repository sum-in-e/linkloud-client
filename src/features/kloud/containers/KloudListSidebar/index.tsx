'use client';

import queryKeys from '@/common/modules/apiHooks/queryKeys';
import NewKloudButton from '@/features/kloud/containers/KloudListSidebar/CreatKloud/NewKloudButton';
import KloudMenuItem from '@/features/kloud/containers/KloudListSidebar/KloudMenuItem';
import { useGetGroupMenuListQuery } from '@/features/kloud/modules/apiHooks/useGetGroupMenuListQuery';
import { usePatchKloudPositionByIdMutation } from '@/features/kloud/modules/apiHooks/usePatchKloudPositionByIdMutation';
import { Skeleton, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

const KloudListSidebar = () => {
  const { kloudId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetGroupMenuListQuery();

  const [klouds, setKlouds] = useState(data?.klouds || []);

  const { mutate } = usePatchKloudPositionByIdMutation();

  useEffect(() => {
    if (data) {
      setKlouds(data.klouds);
    }
  }, [data]);

  if (isLoading) {
    // TODO: 스켈레톤 작업
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data) {
    // TODO: 메뉴 못 불러 왔을 경우 UI 적용
    return <div></div>;
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // 사용자가 드래그를 시작했지만 유효한 위치에 드롭하지 않고 취소한 경우 함수 종료
    // source는 드래그를 시작한 항목의 원래 위치임. source.index와 destination.index가 같다면, 이는 사용자가 항목을 움직이지 않고 원래 위치에 두었다는 뜻이므로 함수 종료
    if (!destination || source.index === destination.index) {
      return;
    }
    const copiedKlouds = [...klouds];

    // 드래그된 아이템을 기존 위치에서 제거
    const [reorderedItem] = copiedKlouds.splice(result.source.index, 1);

    //드래그된 아이템을 새로운 위치에 삽입
    copiedKlouds.splice(destination.index, 0, reorderedItem);

    // 상태를 업데이트하여 UI를 새로운 순서로 렌더링
    setKlouds(copiedKlouds);

    // draggableId에 클라우드 id 설정했으니 가져와서 사용
    const id = toNumber(draggableId);

    // 항목이 드롭된 위치로 newPostion을 지정한다. 단, react-beautiful-dnd는 오름차순으로 index를 나타내지만, 서비스에서 클라우드 리스트를 보여줄때는 position 기준 내림차순으로 보여주기 때문에 destination.index를 그대로 사용할 수 없어 내림차순 기준에 맞게 인덱스를 변환한다.
    // 백엔드가 클라우드 항목의 위치를 연속적인 정수로 관리하고 있으며, 프론트엔드의 인덱스와 동일하게 0부터 시작한다는 전제 하에 사용 가능한 값이다.
    const newPosition = copiedKlouds.length - 1 - destination.index;

    // 위치 변경 API 호출
    handleChangeKloudPosition({ id, newPosition });
  };

  const handleChangeKloudPosition = ({
    id,
    newPosition,
  }: {
    id: number;
    newPosition: number;
  }) => {
    mutate(
      { id, body: { newPosition } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
        },
        onError: (error) => {
          const isNotServerError = error.response?.status !== 500;

          if (isNotServerError) {
            const message =
              error.response?.data.message ||
              '클라우드 위치 변경에 실패하였습니다.';
            toast({
              title: message,
              status: 'warning',
              duration: 2000,
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const isShowCreatKloudButton = klouds.length < 20;

  return (
    <div>
      <div className="p-4">
        <p className="text-md font-bold text-white">클라우드</p>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="klouds">
          {(provided) => (
            <div>
              {klouds.length === 0 ? (
                <li>
                  <p>☁️ 보유한 클라우드가 없어요 ☁️</p>
                </li>
              ) : (
                <ul
                  className=" flex w-full flex-col gap-2 px-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {isShowCreatKloudButton && <NewKloudButton />}
                  {klouds.map((kloud, index) => (
                    <Draggable
                      key={kloud.id}
                      draggableId={kloud.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={`${kloud.id}_${kloud.name}`}
                        >
                          <KloudMenuItem kloud={kloud} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KloudListSidebar;
