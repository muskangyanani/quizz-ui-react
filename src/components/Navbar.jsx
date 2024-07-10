export default function Navbar() {
  return (
    <div className="border h-16 flex justify-between items-center p-6 shadow-md">
      <h1 className="text-teal-700 font-extrabold text-3xl">QUIZZ</h1>
      <div className="flex gap-6">
        <button className="border px-2 py-1 rounded-md text-teal-700 font-bold border-zinc-700 hover:bg-white">Create a Quiz</button>
        <button className="border px-3 rounded-md bg-teal-700 text-white font-bold border-zinc-700">Logout</button>
      </div>
    </div>
  )
}