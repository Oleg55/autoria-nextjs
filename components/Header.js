import Link from 'next/link'

const Header = () =>  {
  return (
    <div className='header'>
        <div className='container'>
            <Link href="addcar">
            <a>Add Car</a>
            </Link>
        </div>
    </div>
  )
}

export default Header;

