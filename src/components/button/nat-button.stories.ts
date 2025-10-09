export default {
  title: 'Components/Button',
  component: 'nat-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
  },
  render: args => {
    const button = document.createElement('nat-button');
    button.setAttribute('variant', args.variant);
    button.textContent = 'Primary Button';
    return button;
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
  },
  render: args => {
    const button = document.createElement('nat-button');
    button.setAttribute('variant', args.variant);
    button.textContent = 'Secondary Button';
    return button;
  },
};
