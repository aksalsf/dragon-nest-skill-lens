import { Fragment } from "react"
import { useApp } from '@/hooks'

const PLACEHOLDER_ID = 0
import placeholder from '@/assets/png/placeholder.png'

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
            placeholder="Type the skill name! (Click enter to search)"
            onChange={methods.handleChange}
            autoFocus
          />
        </form>
        {data.result.map((char) => (
          <Fragment key={char.id}>
            <hr className="border border-dashed border-neutral-700" />
            <div className="w-full p-4 bg-neutral-700 rounded-sm">
            <img
              src={char.image || placeholder}
              className="w-full"
              alt={char.class || "good image for placeholder"}
            />
            </div>
            {char.id !== PLACEHOLDER_ID && (
              <div className="w-full p-4 bg-neutral-700 rounded-sm text-center">
                <h1 className="text-amber-500 text-xl font-bold mb-1">
                  {char.class}
                </h1>
                <div className="text-neutral-300 mb-1.5">
                  ({char.skill.type} - {char.skill.name})
                </div>
                <p className="text-neutral-300">
                  <span className="text-amber-200">{methods.generateUsabilityDescription(char.skill.usability)}</span>
                </p>
              </div>
            )}
          </Fragment>
        ))}
        <p className="text-xs leading-5 text-neutral-300">
          <strong>
            Norfe Project: Dragon Nest Skill Lens
          </strong> is a tool to help you find the best skill for your class in Dragon Nest. <br/>
          Made with <span className="text-red-500">❤</span> by Sayamusa
        </p>
      </div>
    </main>
  )
}

export default App
