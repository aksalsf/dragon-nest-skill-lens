import { useApp } from '@/hooks'

import placeholder from '@/assets/jpg/placeholder.jpg'

function App() {
  const { data, methods } = useApp()
  return (
    <main className="min-h-screen w-screen flex justify-center p-2 md:p-8 bg-neutral-800">
      <div className="flex flex-col gap-5 w-full lg:w-1/2">
        <form onSubmit={methods.handleSubmit}>
          <input
            className="w-full p-4 bg-neutral-700 text-white outline-none rounded-sm"
            name="keyword"
            type="text"
            placeholder="Tell me what you get! (Click enter after u tell us)"
            onChange={methods.handleChange}
            autoFocus
          />
        </form>
        <hr className="border border-dashed border-neutral-700" />
        <div className="w-full p-4 bg-neutral-700 rounded-sm">
          <img
            src={data.result.image || placeholder}
            className="w-full"
            alt={data.result.class || "good image for placeholder"}
          />
        </div>
        {!!data.result.id && (
          <div className="w-full p-4 bg-neutral-700 rounded-sm text-center">
            <h1 className="text-amber-500 text-xl font-bold mb-1">
              {data.result.class}
            </h1>
            <div className="text-neutral-300 mb-1.5">
              ({data.result.skill.type} - {data.result.skill.name})
            </div>
            <p className="text-neutral-300">
              Is it good? <span className="text-amber-200">{data.result.skill.usability}</span>
            </p>
          </div>
        )}
        <p className="text-xs leading-5 text-neutral-300">
          This project is not affliated with Eyedentity in any way. If you find that this project is useful, please consider supporting me by sending me a bunch of gold or some Guide Star (I'm a poor player). <br />
          Made with <span className="text-red-500">❤</span> by Sayamusa (BETA)
        </p>
      </div>
    </main>
  )
}

export default App
