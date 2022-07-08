import { Button, Grid, Paper, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import GoiTiemItem from '~/components/goiTiemItem'
import KhachHangItem from '~/components/khachHangItem'
import Layout from '~/components/layout'
import NguoiGiamHoItem from '~/components/nguoiGiamHoItem'
import PhieuDKTiemItem from '~/components/phieuDKTiemItem'
import {
  GoiTiem,
  HoaDon,
  KhachHang,
  NguoiGiamHo,
  PhieuDKTiem,
  VacXin,
} from '~/model'
import { apiUrl } from '~/src/constants'
import { v4 as uuidv4 } from 'uuid'
import VaccineItem from '~/components/vaccineItem'
import { getKhachHang } from '~/src/utils'
import { useRouter } from 'next/router'
import HoaDonItem from '~/components/hoaDonItem'
import { useAppDispatch } from '~/redux/hook'
import modalSlice from '~/components/modal/modalSlice'
import ModalThanhToanPhieuDK from '~/components/modalThanhToanPhieuDK'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const maPhieuDK = ctx.params?.maPhieuDK
    const res = await fetch(`${apiUrl}/phieu-dk-tiem/${maPhieuDK}`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const phieuDKTiem: PhieuDKTiem = data.phieuDKTiem

    const khachHang: KhachHang = await getKhachHang(phieuDKTiem.MaKhachHang)

    const dataNguoiGiamHo = await fetch(
      `${apiUrl}/nguoi-giam-ho/phieu-dk-tiem/${phieuDKTiem.MaPhieuDK}`
    ).then((data) => data.json())
    const nguoiGiamHo: NguoiGiamHo = dataNguoiGiamHo?.nguoiGiamHo || {}

    const dataDsGoiTiem = await fetch(
      `${apiUrl}/goi-tiem/phieu-dk-tiem/${phieuDKTiem.MaPhieuDK}`
    ).then((data) => data.json())
    const dsGoiTiem: GoiTiem[] = dataDsGoiTiem.dsGoiTiem

    const dataDsVacXin = await fetch(
      `${apiUrl}/vac-xin/phieu-dk-tiem/${phieuDKTiem.MaPhieuDK}`
    ).then((data) => data.json())
    const dsVacXin: VacXin[] = dataDsVacXin.dsVacXin

    const dataHoaDon = await fetch(
      `${apiUrl}/hoa-don/phieu-dk-tiem/${phieuDKTiem.MaPhieuDK}`
    ).then((data) => data.json())
    const hoaDon: HoaDon = dataHoaDon?.hoaDon || {}

    return {
      props: {
        phieuDKTiem,
        khachHang,
        nguoiGiamHo,
        dsGoiTiem,
        dsVacXin,
        hoaDon,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  phieuDKTiem: PhieuDKTiem
  khachHang: KhachHang
  nguoiGiamHo?: NguoiGiamHo
  dsGoiTiem: GoiTiem[]
  dsVacXin: VacXin[]
  hoaDon?: HoaDon
}
const SheetDetail: NextPage<Props> = ({
  phieuDKTiem,
  khachHang,
  nguoiGiamHo,
  dsGoiTiem,
  dsVacXin,
  hoaDon,
}) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  return (
    <Layout
      title="Thông tin phiếu đăng ký tiêm"
      titlePage={`Thông tin chi tiết phiếu đăng ký tiêm - Mã [${phieuDKTiem.MaPhieuDK}]`}
    >
      <Grid container spacing={6}>
        <Grid item container xs={4} spacing={6}>
          <Grid item container spacing={2} alignContent="flex-start">
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  router.push(`/sheets/${phieuDKTiem.MaPhieuDK}/injects`)
                }
              >
                Xem các phiếu tiêm
              </Button>
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignContent="flex-start">
            <Grid item xs={12}>
              <Paper elevation={6} sx={{ borderRadius: 5 }}>
                <PhieuDKTiemItem phieuDKTiem={phieuDKTiem} detail />
              </Paper>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item>
              <Typography
                variant="h6"
                textTransform="uppercase"
                color="primary"
              >
                Thông tin khách hàng của phiếu: {phieuDKTiem.MaPhieuDK}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Paper elevation={6} sx={{ borderRadius: 5 }}>
                <KhachHangItem khachHang={khachHang} />
              </Paper>
            </Grid>
          </Grid>
          {nguoiGiamHo?.MaNguoiGiamHo && (
            <Grid item container>
              <Grid item>
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  color="primary"
                >
                  Thông tin người giám hộ của phiếu: {phieuDKTiem.MaPhieuDK}
                </Typography>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Paper elevation={6} sx={{ borderRadius: 5 }}>
                  <NguoiGiamHoItem nguoiGiamHo={nguoiGiamHo} />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item container xs={8} spacing={4}>
          {dsGoiTiem.length > 0 && (
            <Grid item container spacing={6}>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                alignContent="flex-start"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    textTransform="uppercase"
                    color="primary"
                  >
                    Thông tin các gói tiêm
                  </Typography>
                </Grid>
                {dsGoiTiem?.map((goiTiem) => (
                  <Grid key={uuidv4()} item xs={4}>
                    <Paper elevation={12} sx={{ borderRadius: 5 }}>
                      <GoiTiemItem goiTiem={goiTiem} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          {dsVacXin.length > 0 && (
            <Grid item container spacing={6}>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                alignContent="flex-start"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    textTransform="uppercase"
                    color="primary"
                  >
                    Thông tin các vắc xin
                  </Typography>
                </Grid>
                {dsVacXin?.map((vacXin) => (
                  <Grid key={uuidv4()} item xs={4}>
                    <Paper elevation={12} sx={{ borderRadius: 5 }}>
                      <VaccineItem vaccine={vacXin} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid item container spacing={6}>
            <Grid item xs={12} container spacing={2} alignContent="flex-start">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  color="primary"
                >
                  Hoá đơn
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {hoaDon?.MaHoaDon ? (
                  <Paper elevation={12} sx={{ borderRadius: 5 }}>
                    <HoaDonItem hoaDon={hoaDon} />
                  </Paper>
                ) : (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => dispatch(modalSlice.actions.openModal())}
                  >
                    Thanh toán
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ModalThanhToanPhieuDK
        phieuDKTiem={phieuDKTiem}
        dsGoiTiem={dsGoiTiem}
        dsVacXin={dsVacXin}
      />
    </Layout>
  )
}

export default SheetDetail
