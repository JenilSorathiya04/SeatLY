export default function ErrorMessage({ message = 'Something went wrong.' }) {
  return <p role="alert" className="status status--error">{message}</p>
}
