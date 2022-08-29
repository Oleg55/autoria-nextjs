import Link from 'next/link'

export default function  Header() {
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
