import { CustomButton, Loading } from './styles'

const Button = (props) => {
  const { children, loading, ...rest } = props
  return (
    <CustomButton {...rest}>
      { children }
      { loading && <Loading size={24} /> }
    </CustomButton>
  )
}

export default Button