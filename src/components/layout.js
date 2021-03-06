import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import PropTypes from 'prop-types'
import { Link, Flex, Text, Image } from 'theme-ui'
import styled from '@emotion/styled'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import theme from '../utils/theme-ui'
import GlobalProvider from '../contextProvider/globalProvider'
import { PopupProvider } from '../contextProvider/popupProvider'
import { QueryParamProvider } from '../contextProvider/queryParamProvider'

const Header = dynamic(() => import('./header/headerIndex'))
const Dialog = dynamic(() => import('./dialog'))
const Footer = dynamic(() => import('./footer'))
const Popup = dynamic(() => import('./popup'))

const CookiesBanner = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState('none')
  const [softLaunchSeen, setSoftLaunchSeen] = useState('none')

  useEffect(() => {
    const cookies = window?.localStorage.getItem('cookiesAccepted')
    setCookiesAccepted(cookies)
    const softLaunch = window?.localStorage.getItem('softLaunchSeen')
    if (!softLaunch) {
      setSoftLaunchSeen('false')
      // now the user has seen it
      window?.localStorage.setItem('softLaunchSeen', 'true')
    } else {
      setSoftLaunchSeen('true')
    }
  }, [])

  if (softLaunchSeen === 'false') {
    // Toast({
    //   content: `We're in Softlaunch mode`,
    //   type: 'info'
    // })
  }

  if (cookiesAccepted || cookiesAccepted === 'none') return null
  // TODO: We may build this reusable for possible future banners on the app
  return (
    <CookieBanner
      sx={{
        flexDirection: ['column', 'row', 'row'],
        width: '100%'
      }}
    >
      <Flex sx={{ alignItems: 'center', flexDirection: ['column', 'row', 'row'] }}>
        <Image src={'/images/info_outline.png'} sx={{ mb: [2, 0, 0] }} alt='info_outline' />
        <Text sx={{ color: 'blue', ml: 2, mb: [2, 0, 0] }}>
          This site uses cookies to provide you with an awesome user experience. By using it, you
          accept our{' '}
          <Link
            sx={{
              color: 'blue',
              textDecoration: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            href='https://giveth.io/tos/#cookiePolicy'
          >
            cookies policy
          </Link>
          .
        </Text>
      </Flex>
      <Text
        id='cookies'
        onClick={() => {
          window.localStorage.setItem('cookiesAccepted', true)
          setCookiesAccepted(true)
        }}
        sx={{ cursor: 'pointer', variant: 'headings.h6', color: 'blue' }}
      >
        Ok
      </Text>
    </CookieBanner>
  )
}

const Layout = ({ isHomePage, children, asDialog, noHeader, noFooter }) => {
  const APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const Template = () => {
    if (asDialog) {
      return (
        <Dialog>
          {children}
          <CookiesBanner />
        </Dialog>
      )
    } else {
      return (
        <>
          {!noHeader && (
            <>
              <Header isHomePage={isHomePage} />
              <div style={{ marginTop: '150px' }} />
            </>
          )}
          <div
            style={{
              // applies width 100% to all viewport widths,
              // width 50% above the first breakpoint,
              // and 25% above the next breakpoint
              width: ['100%', '50%', '25%'],
              overflow: 'hidden'
            }}
          >
            <main>{children}</main>
            {!noFooter && <Footer />}
          </div>
          <CookiesBanner />
        </>
      )
    }
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script type='text/javascript' strategy='lazyOnload'>
        {`
          function initMap(setLocation) {
              map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 0, lng: 0 },
                  zoom: 1,
                  mapTypeControl: false,
                  panControl: false,
                  zoomControl: false,
                  streetViewControl: false
              });
              // Create the autocomplete object and associate it with the UI input control.
              autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                {
                  types: ["geocode"],
                }
              );
              places = new google.maps.places.PlacesService(map);
              autocomplete.addListener("place_changed",function(e){
                onPlaceChanged(setLocation);
              });
          }
          function onPlaceChanged(setLocation) {
            const place = autocomplete.getPlace();
            if (place) {
              if (place.geometry) {
                map.panTo(place.geometry.location);
                var marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.formatted_address
                });
                map.setZoom(13);
                setLocation(place.formatted_address)
              } else {
                document.getElementById("autocomplete").placeholder = "Search a Location";
              }
            }
          }
        `}
      </Script>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places&v=weekly`}
        defer
      />
      {/* <Script src='/node_modules/quill-video-resize-module/video-resize.min.js' /> */}

      <PopupProvider>
        <GlobalProvider>
          <QueryParamProvider>
            <Template />
            <Popup />
          </QueryParamProvider>
        </GlobalProvider>
        <StyledToastContainer />
      </PopupProvider>
    </>
  )
}

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__close-button {
    color: ${theme.colors.bodyDark};
  }
  .Toastify__toast {
    border-radius: 4px 0 0 4px;
    background-color: white;
  }
  .Toastify__toast--info {
    border-left: 6px solid ${theme.colors.blue};
  }
  .Toastify__toast--dark {
    background-color: ${theme.colors.primary};
    .Toastify__close-button {
      color: ${theme.colors.background};
    }
  }
  .Toastify__toast--error {
    border-left: 6px solid ${theme.colors.red};
  }
  .Toastify__toast--success {
    border-left: 6px solid ${theme.colors.green};
  }
  .Toastify__toast--warning {
    border-left: 6px solid ${theme.colors.warnYellow};
  }
`

const CookieBanner = styled(Flex)`
  position: fixed;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  text-align: center;
  align-self: center;
  background-color: ${theme.colors.lightBlue};
  border: 1px solid ${theme.colors.blue};
  box-sizing: border-box;
  border-radius: 8px;
  justify-content: space-between;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
