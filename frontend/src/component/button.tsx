import classnames from "classnames"
interface IButton {
  title: string
  className?: string
  type?: "button" | "submit" | "reset"
  variant?: "contained" | "outlined"
  style?: string
  loading?: boolean
  onClick?: () => any
}
export function Button({ title, loading = false, type = "button", style, variant = "contained", ...props }: IButton){
  return(
    <button 
      type={type} 
      disabled={loading}
      className={classnames("btn waves-effect waves-light", style, {
        "btn-primary": variant === "contained",
        "btn-outline-primary": variant === "outlined"
      })} { ...props }>
        { loading && <div className="spinner-grow spinner-grow-sm" role="status"></div> }
        { title }
      </button>
  )
}