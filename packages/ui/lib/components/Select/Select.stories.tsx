import { Select } from './Select'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  component: Select,
  title: 'Select',
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const SelectComponent = Template.bind({})

SelectComponent.args = {
  label: 'Select your option',
  description: <>description example</>,
  customOption: true,
  options: [
    {
      label: 'Test 1',
      value: 1,
      prepend: (
        <div className="flex items-center justify-center w-5 bg-gray-100">
          T1
        </div>
      ),
      append: 'append test 1',
    },
    {
      label: 'Test 2',
      value: 2,
      prepend: (
        <div className="flex items-center justify-center w-5 bg-gray-100">
          T2
        </div>
      ),
      append: 'append test 2',
    },
    {
      label: 'Test 3',
      value: 3,
      disabled: true,
    },
  ],
}
