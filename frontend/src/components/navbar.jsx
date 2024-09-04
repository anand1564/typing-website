
const Navbar = () => {
    return (
        <>
            <nav className="bg-monkeytypeGray p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">Typed</div>
                    <div>
                    <button className="bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg mr-4 hover:bg-gray-200 transition duration-200">
            Sign Up
          </button>
          <button className="bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200">
            Login
          </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;