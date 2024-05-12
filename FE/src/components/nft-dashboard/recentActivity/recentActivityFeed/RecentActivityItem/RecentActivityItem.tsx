import React from 'react';
import { Activity } from '@app/api/activity.api';
import * as S from './RecentActivityItem.styles';
import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone';

export const RecentActivityItem: React.FC<Activity> = ({ image, title, status, link, note }) => {
  return (
    <S.ActivityCard>
      <S.Wrapper>
        <S.ImgWrapper>
          <img src={image} alt={title} width={84} height={84} style={{ borderRadius: '8px' }} />
        </S.ImgWrapper>

        <S.InfoWrapper>
          <S.InfoHeaderWrapper>
            <S.TitleWrapper>
              <S.Title level={5}>{title}</S.Title>
            </S.TitleWrapper>
            <S.Text>
              <a href={link}>
                ĐỂ BIẾT THÊM NHIỀU HƠN <FileTextTwoTone />
              </a>
            </S.Text>
            <S.Text>{note}</S.Text>
          </S.InfoHeaderWrapper>
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
