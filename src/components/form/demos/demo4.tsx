import React, { useState, FC } from 'react'
import { Form, Input, Button, Picker, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import { DownOutline } from 'antd-mobile-icons'

interface MobileValue {
  preValue: string
  realValue: string
}

export default () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  const checkMobile = (_: any, value: MobileValue) => {
    if (value.realValue) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('手机号不能为空!'))
  }

  return (
    <>
      <DemoBlock
        title='自定义表单控件'
        padding='0'
        border='none'
        background='transparent'
      >
        <Form
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            mobile: { preValue: '86', realValue: '' },
          }}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }
        >
          <Form.Item
            label='姓名'
            name='name'
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label='手机号'
            name='mobile'
            rules={[{ required: true }, { validator: checkMobile }]}
          >
            <MobileField />
          </Form.Item>
        </Form>
      </DemoBlock>
    </>
  )
}

const columns = [['86', '01', '02', '03']]

interface MobileFieldProps {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const MobileField: FC<MobileFieldProps> = ({
  value = { preValue: '86', realValue: '' },
  onChange,
}) => {
  const [visible, setVisible] = useState(false)

  const triggerValue = (changedValue: Partial<MobileValue>) => {
    onChange?.({ ...value, ...changedValue })
  }

  const onRealValueChange = (value: string) => {
    triggerValue({ realValue: value })
  }

  const onPreValueChange = (value: string[]) => {
    triggerValue({ preValue: value[0] })
  }
  return (
    <>
      <Space align='center'>
        <Space align='center' onClick={() => setVisible(true)}>
          <div>+{value.preValue}</div>
          <DownOutline />
        </Space>
        <Input
          placeholder='请输入手机号'
          value={value.realValue}
          onChange={onRealValueChange}
        />
      </Space>
      <Picker
        columns={columns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={[value.preValue]}
        onConfirm={onPreValueChange}
      />
    </>
  )
}
