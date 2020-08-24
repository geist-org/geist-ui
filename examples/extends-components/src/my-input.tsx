import React, { ReactElement } from 'react'
import { Input, Spacer, Text } from '@geist-ui/react'

type InputErrorType = {
  error?: string
}

const MyInput: React.FC<InputErrorType & React.ComponentProps<typeof Input>> = ({
  error = null,
  ...inputProps
}): ReactElement => {
  const hasError = Boolean(error)
  const { status } = inputProps
  return (
    <>
      <Input status={hasError ? 'error' : status} {...inputProps} />
      {hasError && (
        <>
          <Spacer y={0.4} />
          <Text small type="error" size="var(--size-xs2)">
            {error}
          </Text>
        </>
      )}
    </>
  )
}

export default MyInput
