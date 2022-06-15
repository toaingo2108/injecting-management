import { NextPage } from 'next'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import Layout from '~/components/layout'
import Link from 'next/link'

const steps = [
  {
    label: 'Bước 1',
    description: 'Thông tin người được tiêm',
  },
  {
    label: 'Bước 2',
    description: 'Thanh toán',
  },
  {
    label: 'Bước 3',
    description: 'Xác nhận từ VNVC',
  },
]

const Register: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Layout title="Đăng ký vắc xin" titlePage="Đăng ký mũi tiêm">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Quay lại
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Link href="/">
              <Button sx={{ mt: 1, mr: 1 }}>Trang chủ</Button>
            </Link>
          </Paper>
        )}
      </Box>
    </Layout>
  )
}

export default Register
