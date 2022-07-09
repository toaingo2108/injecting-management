import React from 'react'
import Layout from '~/components/layout'
import ListEmpty from '~/components/listEmpty'

const FourOhFour = () => {
  return (
    <Layout title="Không tìm thấy trang">
      <ListEmpty title="Có gì đó không đúng ở đây bạn vui lòng thử lại nhé ^^" />
    </Layout>
  )
}

export default FourOhFour
