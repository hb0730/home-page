export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: false,
    },
    src: {
      type: String,
      required: false,
    },
  },
  setup(props, { attrs }) {
    const isIcon = !props.src
    const iconRender = () => {
      return (
        <div class={props.icon} {...attrs}></div>
      )
    }
    const imgRender = () => {
      return <img src={props.src} {...attrs} />
    }
    return () => (
      <>
        {isIcon ? iconRender() : imgRender()}
      </>
    )
  },
})
