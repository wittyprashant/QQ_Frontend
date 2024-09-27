import React from 'react'
import Page from '../../components/Page'
import Footer from '../../components/partials/Footer'
import Sidebar from '../../components/partials/Sidebar'

const DefaultLayout = ({headerText} ) => {
  return (
    <div>
        <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="body flex-grow-1 ">
          <Page />
        </div>
      <Footer/>
      </div>
    </div>
  )
}

export default DefaultLayout;