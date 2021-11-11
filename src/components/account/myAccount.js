import React, { useContext, useState } from "react";
import { Flex, Text } from "theme-ui";
import Notification from "../notification";
import Avatar from "../avatar";
import EditProfileModal from "./editProfileModal";
import { Context as Web3Context } from "../../contextProvider/Web3Provider";

const MyAccount = ({ info }) => {
  const {
    state: { user, account },
  } = useContext(Web3Context);

  const [openModal, setOpenModal] = useState(false);
  // const [ethPrice, setEthPrice] = useState(1)

  // const balance = wallet?.balance

  // useEffect(() => {
  //   const init = async () => {
  //     fetch(
  //       'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'
  //     ).then(response => response.json())
  //     // .then(data => setEthPrice(data.USD))
  //   }
  //   init()
  // }, [])
  console.log({ userssss: user });
  return (
    <>
      <EditProfileModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
      />

      {!user?.name && (
        <Notification
          content="Please finish setting up your public profile."
          action={{ title: "Complete Profile", do: () => setOpenModal(true) }}
          type="warn"
        />
      )}

      <Flex>
        <Avatar
          img={user?.profileImage || user?.avatar}
          size={100}
          address={account}
        />
        <Flex
          sx={{ flexDirection: "column", ml: "27px", textAlign: "flex-end" }}
        >
          <Text sx={{ color: "secondary", fontSize: 7 }}>{user?.name}</Text>
          <Text sx={{ color: "bodyDark", fontSize: 3 }}>{user?.email}</Text>
          <Text
            onClick={() => setOpenModal(true)}
            sx={{
              color: "primary",
              fontSize: 3,
              variant: "links.default",
              mt: 2,
            }}
          >
            Edit Public Profile
          </Text>
        </Flex>
      </Flex>
      <Flex sx={{ mt: "40px", alignItems: "center" }}>
        <Text sx={{ textTransform: "uppercase", fontSize: 0 }}>
          Wallet Address
        </Text>
        {/* <Button
          type='button'
          sx={{
            color: 'primary',
            border: 0,
            background: 'unset',
            fontSize: 1
          }}
        >
          Change
        </Button> */}
      </Flex>
      <Text sx={{ mt: "14px", variant: "text.medium", color: "secondary" }}>
        {account}
      </Text>
      <Flex sx={{ mt: "40px" }}>
        <Flex
          sx={{
            flexDirection: "column",
            width: ["50%", "30%", "30%"],
            height: "100px",
            paddingTop: "20px",
            paddingLeft: "24px",
            backgroundColor: "#F4F6FC",
            borderRadius: "12px",
          }}
        >
          <Text
            sx={{
              fontSize: 0,
              color: "secondary",
              textTransform: "uppercase",
            }}
          >
            My donations
          </Text>
          <Text sx={{ color: "primary", fontSize: 7 }}>
            {info?.myDonations}
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDirection: "column",
            width: ["50%", "30%", "30%"],
            height: "100px",
            paddingTop: "20px",
            paddingLeft: "24px",
            backgroundColor: "#F4F6FC",
            borderRadius: "12px",
            ml: "5%",
          }}
        >
          <Text
            sx={{
              fontSize: 0,
              color: "secondary",
              textTransform: "uppercase",
            }}
          >
            My projects
          </Text>
          <Text sx={{ color: "primary", fontSize: 7 }}>
            {info?.myProjects || 0}
          </Text>
        </Flex>
      </Flex>
      {/* <Box
        sx={{
          width: ['100%', '65%', '65%'],
          height: '100px',
          paddingTop: '20px',
          paddingLeft: '24px',
          backgroundColor: '#F4F6FC',
          borderRadius: '12px',
          mt: '24px',
          mb: ['24px', 0, 0]
        }}
      >
        <Text
          sx={{
            fontSize: 0,
            color: 'secondary',
            textTransform: 'uppercase'
          }}
        >
          Total value of assets in wallet
        </Text>
        <Flex sx={{ alignItems: 'baseline', paddingTop: '10px' }}>
          <Text sx={{ fontFamily: 'heading', color: 'secondary', fontSize: 7 }}>
            {balance && ethPrice && `$${(ethPrice * balance).toFixed(2)}`}
          </Text>
          <Text
            sx={{
              fontFamily: 'heading',
              color: 'secondary',
              fontSize: 3,
              ml: '10%'
            }}
          >
            {balance ? `${balance} ETH` : null}
          </Text>
        </Flex>
      </Box> */}
    </>
  );
};

export default MyAccount;
