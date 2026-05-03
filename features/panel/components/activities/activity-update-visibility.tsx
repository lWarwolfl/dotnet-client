// 'use client'

// import { Switch } from '@/components/ui/switch'
// import { useUpdateActivity } from '@/features/panel/mutations/games/useUpdateActivity.mutation'
// import { TListActivitysAction } from '@/server/activity/listActivitys.action'
// import { useState } from 'react'

// export type ActivityUpdateVisibilityProps = { data: TListActivitysAction['games'][number] }

// export default function ActivityUpdateVisibility({ data }: ActivityUpdateVisibilityProps) {
//   const [visible, setVisible] = useState<boolean>(data.visible)

//   const { mutate: mutateUpdateActivity, isPending: isPendingUpdateActivity } = useUpdateActivity()

//   function onSubmit() {
//     mutateUpdateActivity(
//       { id: data.id, visible: !visible },
//       {
//         onSuccess: (res) => {
//           setVisible(res[0].visible)
//         },
//       }
//     )
//   }

//   return <Switch onClick={() => onSubmit()} checked={visible} disabled={isPendingUpdateActivity} />
// }
