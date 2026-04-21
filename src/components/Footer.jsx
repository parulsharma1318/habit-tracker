const Footer = () => {

  const year = new Date().getFullYear()

  return (

    <footer className="mt-10 py-6 text-center text-sm text-gray-400 border-t border-white/10">

      © {year} HabitPro • Built with ❤️ by Parul Sharma

    </footer>

  )

}

export default Footer;