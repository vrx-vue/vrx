<script lang="ts" setup>
  import { VPTeamPage, VPTeamMembers } from 'vitepress/theme'
  import { giteeIcon } from '../../gitee-icon'
  const members = [
    {
      avatar:
        'https://portrait.gitee.com/uploads/avatars/user/2737/8211287_white-kite_1660498418.png',
      name: 'WhiteKite',
      title: 'Author',
      desc: '希儿天下第一',
      links: [
        {
          icon: {
            svg: giteeIcon,
          },
          link: 'https://gitee.com/white-kite',
        },
      ],
    },
  ]
</script>
<template>
  <VPTeamPage class="mt-20px">
    <VPTeamMembers size="small" :members="members" />
  </VPTeamPage>
</template>
