const Layout = ({children}) => {
  return (
    <section className='bg-blue-400 lg:min-h-screen flex items-center justify-center max-lg:h-auto'>
      <div className='maxContainer w-full '>
        <div className='w-full bg-slate-50 rounded-md grid lg:grid-cols-2 max-lg:grid-rows-2 lg:h-screen 2xl:h-[90vh]'>
        <div className='imgStyle'>
          <div className='cartoonImg'/>
          <div className='cloud_one'/>
          <div className='cloud_two'/>
        </div>
        <div className='flex flex-col justify-evenly max-lg:my-20'>
            {children}
        </div>
      </div>
    </div>
    </section>
  )
}

export default Layout