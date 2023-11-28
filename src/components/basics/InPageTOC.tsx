import * as React from 'react';
import { styled } from '@storybook/theming';
import { color, fontWeight, spacing, Text } from '@chromaui/tetra';

const Heading = styled((props) => <Text as="h2" variant="body14" {...props} />)`
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing[3]};
`;

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  ol & {
    margin-top: ${spacing[3]};
    margin-left: ${spacing[4]};
  }
`;

const TOCItem = styled((props) => <Text as="li" variant="body14" {...props} />)`
  margin-bottom: ${spacing[3]};

  & > a {
    color: ${color.slate600};
    display: block;
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${color.blue500};
    }
  }
`;

type Item = {
  title: string;
  url: string;
  items?: Item[];
};

type InPageTOCProps = {
  items: Item[];
};

export const InPageTOC = ({ items }: InPageTOCProps) => (
  <>
    <Heading>On this page</Heading>
    <List>
      {items.map((h2Item) => (
        <TOCItem key={h2Item.title}>
          <a href={h2Item.url}>{h2Item.title}</a>
          {h2Item.items ? (
            <List>
              {h2Item.items.map((h3Item) => (
                <TOCItem key={h3Item.title}>
                  <a href={h3Item.url}>{h3Item.title}</a>
                  {h3Item.items ? (
                    <List>
                      {h3Item.items.map((h4Item) => (
                        <TOCItem key={h4Item.title}>
                          <a href={h4Item.url}>{h4Item.title}</a>
                        </TOCItem>
                      ))}
                    </List>
                  ) : null}
                </TOCItem>
              ))}
            </List>
          ) : null}
        </TOCItem>
      ))}
    </List>
  </>
);
