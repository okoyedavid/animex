export default function Error({ err }) {
  return (
    <div className="error">
      <p>Something went wrong ❌ </p>
      <span>{err}</span>
    </div>
  );
}
