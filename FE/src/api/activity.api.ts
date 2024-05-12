import { ActivityStatusType } from '@app/interfaces/interfaces';

export interface Activity {
  image: string;
  title: string;
  status: ActivityStatusType;
  date: number;
  link: string;
  note: string;
}

export interface UserActivity extends Omit<Activity, 'owner'> {
  usd_value: number;
}

export interface TrendingActivity {
  title: string;
  owner: string;
  image: string;
  avatar: string;
  usd_value: number;
}
//TeamWork
export const getActivities = (): Promise<Activity[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          image: 'https://bvtb.org.vn/wp-content/uploads/2023/07/THONGBAOSV.jpg',
          title: 'CÁC QUY ĐỊNH CỦA CẢNG',
          status: 'added',
          date: Date.now() - 1000 * 60 * 24,
          link: 'https://cangvuhanghaidanang.gov.vn/sites/default/files/noi_quy_cang_bien_da_nang_-_ban_tich_hop_qd_35_va_qd_106.pdf',
          note: 'Nội quy này được áp dụng đối với cơ quan, đơn vị, tổ chức, cá nhân, tàu thuyền Việt Nam và nước ngoài hoạt động tại Cảng biển Đà Nẵng và khu vực vùng biển thuộc địa phận thành phố Đà Nẵng.',
        },
        {
          image:
            'https://staticgthn.kinhtedothi.vn/zoom/868/uploaded/nhungtkts/2023_08_25/06thuyenviengapnantauqb93838tsduoclucluongcuunanhanghaitimkiemvacuusong-152330845_tilr.jpg',
          title: 'CÁC QUY ĐỊNH KHI RA KHƠI',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 2,
          link: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2017/12/18.signed.pdf',
          note: 'Theo đó, ngư dân và chủ tàu cá cần thực hiện các nội dung tại Luật Thủy sản 2017, Nghị định 26/2019/NĐ-CP và các văn bản pháp lý hướng dẫn Luật Thủy sản liên quan. Mỗi chủ tàu cá và ngư dân ra khơi cần ghi nhớ những quy định tối thiểu sau',
        },
        {
          image:
            'https://cdnphoto.dantri.com.vn/8rgLxhYCPqj-IhI0aGT3BW1M-Gs=/thumb_w/960/2021/02/14/dang-kiem-1-1613263589404.jpg',
          title: 'CÁC QUY ĐỊNH ĐĂNG KIỂM',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 22,
          link: 'https://phapluatxnk.vn/quy-dinh-ve-dang-kiem-tau-bien',
          note: 'Căn cứ Bộ luật Hàng hải Việt Nam ngày 25 tháng 11 năm 2015; Căn cứ Luật Chất lượng sản phẩm, hàng hóa ngày 21 tháng 11 năm 2007;',
        },
        {
          image: 'https://baogiaothong.mediacdn.vn/files/Baogiay/2018/11/07/051847-3.jpg',
          title: 'QUY ĐỊNH XỬ PHẠT VI PHẠM',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 8,
          link: 'https://thuvienphapluat.vn/van-ban/Vi-pham-hanh-chinh/Nghi-dinh-139-2021-ND-CP-xu-phat-vi-pham-hanh-chinh-giao-thong-duong-thuy-noi-dia-499527.aspx',
          note: 'Theo đó, Nghị định quy định về hành vi vi phạm hành chính, hình thức xử phạt, mức xử phạt, biện pháp khắc phục hậu quả đối với hành vi vi phạm hành chính; thẩm quyền lập biên bản vi phạm hành chính và thẩm quyền xử phạt vi phạm hành chính trong lĩnh vực hàng hải.',
        },
        {
          image: 'https://cangvuhanghaidanang.gov.vn/sites/default/files/logo-cang-vu-da-nang.png',
          title: 'TIN TỨC CẢNG VỤ HÀNG HẢI ĐÀ NẴNG',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 8,
          link: 'https://cangvuhanghaidanang.gov.vn/',
          note: 'Tăng cường công tác tuần tra, kiểm soát trên các tuyến luồng hàng hải. Thường xuyên thông tin, cảnh báo về tình hình thời tiết, khí tượng thủy văn cho các tàu thuyền. Phối hợp với các cơ quan chức năng để xử lý các vụ tai nạn giao thông trên biển.',
        },
      ]);
    }, 1000);
  });
};