function AuthContainer({ children, signInfo, visual, handleSubmit }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl grid-cols-1 gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-12">
      <section className="relative order-2 overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-6 shadow-cinema backdrop-blur-xl sm:p-8 lg:order-1 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,61,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(67,97,238,0.22),transparent_30%)]" />
        <div className="relative flex h-full flex-col justify-between gap-10">
          {signInfo}
          {visual ? <div>{visual}</div> : null}
        </div>
      </section>

      <section className="order-1 flex items-center justify-center lg:order-2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-surface-strong p-6 shadow-cinema backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-5">{children}</div>
        </form>
      </section>
    </div>
  );
}

export default AuthContainer;
