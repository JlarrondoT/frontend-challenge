export default function ErrorComponent(props: { retry: any }) {
  return (
    <div className="error-container">
      <p>Ocurrió un error</p>
      <button data-testid="retry-button" onClick={() => props.retry(true)}>
        reintentar
      </button>
    </div>
  );
}
