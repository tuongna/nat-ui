const m={title:"Components/Button",component:"nat-button",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary"]}}},n={args:{variant:"primary"},render:e=>{const t=document.createElement("nat-button");return t.setAttribute("variant",e.variant),t.textContent="Primary Button",t}},r={args:{variant:"secondary"},render:e=>{const t=document.createElement("nat-button");return t.setAttribute("variant",e.variant),t.textContent="Secondary Button",t}};var a,o,s;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    variant: 'primary'
  },
  render: args => {
    const button = document.createElement('nat-button');
    button.setAttribute('variant', args.variant);
    button.textContent = 'Primary Button';
    return button;
  }
}`,...(s=(o=n.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var u,c,i;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  },
  render: args => {
    const button = document.createElement('nat-button');
    button.setAttribute('variant', args.variant);
    button.textContent = 'Secondary Button';
    return button;
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const d=["Primary","Secondary"];export{n as Primary,r as Secondary,d as __namedExportsOrder,m as default};
