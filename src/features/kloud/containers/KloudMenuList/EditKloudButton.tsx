// 'use client';

// import ConfirmModal, {
//   positiveActionColorType,
// } from '@/common/components/ConfirmModal';
// import queryKeys from '@/common/modules/apiHooks/queryKeys';
// import { useOpen } from '@/common/modules/hooks/useOpen';
// import { useDeleteKloudByIdMutation } from '@/features/kloud/modules/apiHooks/useDeleteKloudByIdMutation';
// import { usePatchKloudByIdMutation } from '@/features/kloud/modules/apiHooks/usePatchKloudByIdMutation';
// import { KloudListKloudType } from '@/features/kloud/modules/apis/kloud';
// import { useToast } from '@chakra-ui/react';
// import { useQueryClient } from '@tanstack/react-query';
// import { josa } from 'josa';
// import { toNumber } from 'lodash';
// import { useParams } from 'next/navigation';
// import { FormEvent, MouseEvent } from 'react';

// interface Props {
//   kloud: KloudListKloudType;
// }

// const EditKloudButton = ({ kloud }: Props) => {
//   const { kloudId } = useParams();

// const [newName, setNewName] = useState('');

// const handleChangeNewName = (event: ChangeEvent<HTMLInputElement>) => {
//   setNewName(event.target.value);
// };

//   const toast = useToast();
//   const queryClient = useQueryClient();
//   const { isOpen, onClose, onOpen } = useOpen();

//   const { mutate: patchKloudMutate } = usePatchKloudByIdMutation();

//   const handleEditKloud = () => {
//     patchKloudMutate(
//       { id: kloud.id, body: { name: newName } },
//       {
//         onSuccess: (data) => {
//           queryClient.invalidateQueries(queryKeys.kloud.getGroupMenuList);
//           if (toNumber(kloudId) === kloud.id) {
//             // 수정한 클라우드가 현재 보여지고 있는 페이지의 클라우드라면 리스트 상단의 클라우드명 새로고침
//             queryClient.invalidateQueries(
//               queryKeys.kloud.getKloudById(kloud.id)
//             );
//           }
//           resetNewNameInput();
//         },
//         onError: (error) => {
//           const isNotServerError = error.response?.status !== 500;

//           if (isNotServerError) {
//             const message =
//               error.response?.data.message ||
//               '클라우드 수정에 실패하였습니다. 다시 시도해 주세요.';

//             toast({
//               title: message,
//               status: 'warning',
//               duration: 2000,
//               isClosable: true,
//             });
//           }
//         },
//       }
//     );
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (newName.length > 50) {
//       toast({
//         title: '클라우드 이름은 50자 이내로 작성해 주세요.',
//         status: 'warning',
//         duration: 2000,
//         isClosable: true,
//       });
//       return;
//     }

//     if (newName === kloud.name) {
//       resetNewNameInput();
//       return;
//     }

//     handleEditKloud();
//   };

//   return (
//     <>
//       <button className="w-fit px-3 py-2 text-sm font-semibold hover:bg-zinc-200">
//         수정
//       </button>
//       {isOpen && (
//         <ConfirmModal
//           title={modalInfo.title}
//           description={modalInfo.description}
//           onClose={onClose}
//           positiveAction={modalInfo.positiveAction}
//           negativeAction={modalInfo.negativeAction}
//         />
//       )}
//     </>
//   );
// };
// export default EditKloudButton;
