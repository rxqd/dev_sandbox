export default function BentoGrid() {
    return (
        <div className="flex border rounded shadow w-90 h-40 my-2 mx-5 gap-0.5 bg-sky-300">
            <div className="rounded flex-1 grow-2 flex flex-col gap-0.5 justify-evenly">
                <div className="flex-1 bg-red-400">
                    
                </div>
                <div className="flex-1 bg-green-400">
                    
                </div>
                <div className="flex flex-1 gap-0.5">
                    <div className="flex-1 bg-blue-400">
                    
                </div>
                    <div className="flex-1 bg-green-800">
                
                </div>
                </div>
            </div>
            <div className="rounded flex-1 flex flex-col gap-0.5">
                <div className="flex-1 bg-sky-600"></div>
                <div className="flex-1 bg-gray-400"></div>
                
            </div>
        </div>
    )
}