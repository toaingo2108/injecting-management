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
import { MouseEventHandler, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  steps: {
    label: string
    description: string
    stepPage: JSX.Element
  }[]
  finalActionTitle: string
  finalAction: MouseEventHandler<HTMLButtonElement>
}

const StepperComponent = ({ steps, finalActionTitle, finalAction }: Props) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={uuidv4()}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography variant="h5">{step.description}</Typography>
              <Box p={4}>{step.stepPage}</Box>
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
          <Button sx={{ mt: 1, mr: 1 }} onClick={finalAction}>
            {finalActionTitle}
          </Button>
        </Paper>
      )}
    </>
  )
}

export default StepperComponent
