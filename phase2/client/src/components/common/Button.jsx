export default function Button({ children, href, variant = 'primary', ...props }) {
  const className = `button button--${variant}`
  return href ? <a className={className} href={href} {...props}>{children}</a> : <button className={className} {...props}>{children}</button>
}