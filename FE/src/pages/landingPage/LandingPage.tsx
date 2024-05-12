import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import React, { useState } from 'react';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { RecentActivity } from '@app/components/nft-dashboard/recentActivity/RecentActivity';
import { Layout, Menu, Carousel, Input, Space, Button, message } from 'antd';
import { TwitterSquareFilled, LinkedinFilled, FacebookFilled, SendOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const contentStyle: React.CSSProperties = {
  marginTop: 1,
  height: '640px',
  color: '#fff',
  lineHeight: '640px',
  textAlign: 'center',
  background: '#364d79',
  width: '100%',
  objectFit: 'cover',
};
const menuItemStyle: React.CSSProperties = {
  fontSize: '17px',
  color: '#333',
  textTransform: 'uppercase',
};
const LandingPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success1 = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã đăng ký lấy thông tin mới thành công',
    });
  };
  const success2 = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã đăng ký liên hệ thành công',
    });
  };
  const warning1 = () => {
    messageApi.open({
      type: 'warning',
      content: 'Vui lòng điền đúng định dạng Email',
    });
  };
  const warning2 = () => {
    messageApi.open({
      type: 'warning',
      content: 'Vui lòng điền đầy đủ thông tin',
    });
  };
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handlePhoneChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    const re = /^[0-9\b]+$/;
    if ((value === '' || re.test(value)) && value.length <= 10) {
      setPhone(value);
    }
  };
  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleClick = () => {
    if (validateEmail(email)) {
      success1();
    } else {
      warning1();
    }
  };

  const handleClick1 = () => {
    if (!name || !phone || !email || !feedback) {
      warning2();
    }
    if (!validateEmail(email)) {
      warning1();
    } else {
      success2();
      setName('');
      setPhone('');
      setEmail('');
      setFeedback('');
    }
  };
  return (
    <>
      {contextHolder}
      <PageTitle>Cảng cá Đà Nẵng</PageTitle>
      <Layout style={{ overflowX: 'hidden' }}>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ marginRight: 'auto' }}>
            <h1
              style={{
                fontSize: '36px',
                marginTop: '15px',
                fontWeight: 800,
                background: '-webkit-linear-gradient(top, rgb(238, 238, 238), rgb(19, 38, 77))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MSP-DNP
            </h1>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
          >
            <Menu.Item style={menuItemStyle}>
              <a href="#thongtinchung">Thông tin chung</a>
            </Menu.Item>
            <Menu.Item style={menuItemStyle}>
              <a href="#lichtrinhtau">Lịch trình tàu</a>
            </Menu.Item>
            <Menu.Item style={menuItemStyle}>
              <a href="#lienhechungtoi">Liên hệ chúng tôi</a>
            </Menu.Item>
            <Menu.Item key="login" style={menuItemStyle}>
              <a href="/auth/login">Đăng nhập</a>
            </Menu.Item>
            <Menu.Item key="flag" disabled style={{ textAlign: 'center', cursor: 'default' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                alt="Logo"
                style={{ height: '36px', width: 'auto', marginTop: '32%' }}
              />
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Carousel autoplay={true}>
            <div>
              <img src={require('../../assets/carousel/Carousel2.png').default} style={contentStyle} />
            </div>
            <div>
              <img src={require('../../assets/carousel/Carousel1.png').default} style={contentStyle} />
            </div>
            <div>
              <img src={require('../../assets/carousel/Carousel3.png').default} style={contentStyle} />
            </div>
            <div>
              <img src={require('../../assets/carousel/Carousel4.png').default} style={contentStyle} />
            </div>
          </Carousel>
          <div id="thongtinchung">
            <BaseRow style={{ margin: '20px 12px 20px 12px' }}>
              <BaseCol span={24}>
                <RecentActivity />
              </BaseCol>
            </BaseRow>
          </div>
          <div id="lienhechungtoi">
            <BaseRow
              style={{
                backgroundImage: `url(${require('../../assets/images/son-tra.jpg').default})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '90vh',
              }}
            >
              <BaseCol
                span={10}
                style={{
                  margin: '20px auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h1 style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: '40px' }}>
                  ĐĂNG KÝ LIÊN HỆ
                </h1>
                <TextArea
                  style={{ opacity: 0.8, borderColor: name ? 'initial' : 'red' }}
                  placeholder="Họ và tên"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div style={{ margin: '24px 0 0 0' }} />
                <TextArea
                  style={{ opacity: 0.8, borderColor: phone ? 'initial' : 'red' }}
                  placeholder="Số điện thoại cá nhân"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyPress={handleKeyPress}
                />
                <div style={{ margin: '24px 0 0 0' }} />
                <TextArea
                  style={{ opacity: 0.8, borderColor: email ? 'initial' : 'red' }}
                  placeholder="Email cá nhân"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div style={{ margin: '24px 0 0 0' }} />
                <TextArea
                  style={{ opacity: 0.8, borderColor: feedback ? 'initial' : 'red' }}
                  placeholder="Ý kiến đóng góp"
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div style={{ margin: '24px 0 0 0' }} />
                <Button style={{ fontSize: '20px', margin: '0 24%' }} type="primary" onClick={handleClick1}>
                  ĐĂNG KÝ
                </Button>
              </BaseCol>
            </BaseRow>
          </div>
        </Content>
        <Footer style={{ backgroundColor: '#013A63', padding: '16px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: 'white' }}>HOTLINE: +84-(0)236.3898161</h4>
              <h4 style={{ color: 'white' }}>FAX: +84-(0)236.3820372</h4>
              <h4 style={{ color: 'white' }}>EMAIL: cangvu.dng@vinamarine.gov.vn</h4>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>VỀ CHÚNG TÔI</h4>
              <a href="cangdanang">
                <h4 style={{ color: 'white' }}>Sản phẩm</h4>
              </a>
              <a href="cangdanang">
                <h4 style={{ color: 'white' }}>Trailblazer.FPT</h4>
              </a>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>NGUỒN LỰC KHAI THÁC</h4>
              <a href="https://vinamarine.gov.vn/vi/cang-bien/cang-bien-da-nang">
                <h4 style={{ color: 'white' }}>Các cảng</h4>
              </a>
              <a href="https://thuvienphapluat.vn/hoi-dap-phap-luat/839D71C-hd-tau-ca-viet-nam-duoc-khai-thac-thuy-san-tai-nhung-vung-nao.html">
                <h4 style={{ color: 'white' }}>Các vùng biển đánh bắt</h4>
              </a>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>ĐĂNG KÝ</h4>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  style={{ color: '#013A63' }}
                  placeholder="Lấy thông tin mới nhất"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="primary" onClick={handleClick}>
                  <SendOutlined />
                </Button>
              </Space.Compact>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #2A6F97', padding: '5px 0' }}></div>
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <div>
              <LinkedinFilled style={{ fontSize: '28px', margin: '0 10px' }} />
              <TwitterSquareFilled style={{ fontSize: '28px', margin: '0 10px' }} />
              <FacebookFilled style={{ fontSize: '28px', margin: '0 10px' }} />
            </div>
            <h4 style={{ color: 'white' }}>Một sản phẩm của Trailblazer@FPT University </h4>
            <h4 style={{ color: 'white' }}>©{new Date().getFullYear()} DPM Đã đăng ký bản quyền</h4>
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default LandingPage;
