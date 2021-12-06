import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  Center,
  Skeleton,
  Stack,
  Box,
  Collapse,
  Link,
  List,
  ListItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { FETCH_PROJECTS } from "../../graphql/operations";
import DateFormatter from "../../Utils/DateFormatter";
import "./ProjectList.css";

interface URLParams {
  searchTerm: string;
}

interface Project {
  name: string;
  webUrl: string;
  createdAt: string;
  description: string;
  id: string;
  archived: boolean;
}

interface FetchProjectsData {
  projects: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
      startCursor: string;
    };
    nodes: Project[];
  };
}

interface FetchProjectsVars {
  searchTerm: string;
  first?: number | null;
  last?: number | null;
  after: string;
  before: string;
}

const ProjectList: React.FC = () => {
  const { searchTerm } = useParams<URLParams>();
  const [pagValue, setPagValue] = useState(20);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const { data, loading, error, refetch } = useQuery<
    FetchProjectsData,
    FetchProjectsVars
  >(FETCH_PROJECTS, {
    variables: {
      searchTerm: searchTerm,
      first: pagValue,
      after: "",
      before: "",
    },
    notifyOnNetworkStatusChange: true,
  });

  const renderPagination = () => {
    if (loading) {
      return (
        <Flex justify="space-between" align="center" marginBottom="20px">
          <Skeleton height="30px" width="270px" />
          <Skeleton height="30px" width="220px" />
        </Flex>
      );
    }
    if (
      data?.projects?.pageInfo?.hasNextPage ||
      data?.projects?.pageInfo?.hasPreviousPage
    ) {
      return (
        <Flex justify="space-between" align="center">
          <Flex width="270px" justify="space-between" align="center">
            Showing
            <Select
              value={pagValue}
              width="70px"
              backgroundColor="white"
              onChange={(e) => {
                setPagValue(Number(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
            Results Per Page
          </Flex>
          <Flex width="220px" justify="space-between">
            <Text
              className={
                data?.projects?.pageInfo?.hasPreviousPage
                  ? "page-active"
                  : "page-disabled"
              }
              onClick={() =>
                refetch({
                  before: data.projects.pageInfo.startCursor,
                  last: pagValue,
                  first: null,
                  after: "",
                })
              }
            >
              Previous page
            </Text>
            <Text
              className={
                data?.projects?.pageInfo?.hasNextPage
                  ? "page-active"
                  : "page-disabled"
              }
              onClick={() =>
                refetch({
                  after: data.projects.pageInfo.endCursor,
                  first: pagValue,
                  last: null,
                  before: "",
                })
              }
            >
              Next page
            </Text>
          </Flex>
        </Flex>
      );
    }
  };

  const renderList = () => {
    if (loading) {
      return (
        <Stack>
          <Skeleton height="70px" />
          <Skeleton height="70px" />
          <Skeleton height="70px" />
          <Skeleton height="70px" />
          <Skeleton height="70px" />
        </Stack>
      );
    }
    if (data?.projects?.nodes?.length === 0) {
      return <Center>No results found.</Center>;
    }
    if (error) {
      return <Center>An error occured.</Center>;
    }
    if (data) {
      return (
        <List>
          {data.projects.nodes.map((project: Project, index: number) => {
            return (
              <ListItem key={index} className="list-item">
                <Flex
                  justify="space-between"
                  align="center"
                  className="top-portion"
                  onClick={() => {
                    const newObj = { ...openItems };
                    if (newObj[project.id]) {
                      newObj[project.id] = false;
                      setOpenItems(newObj);
                    } else {
                      newObj[project.id] = true;
                      setOpenItems(newObj);
                    }
                  }}
                >
                  <Box>
                    <Text className="name">{project.name}</Text>
                    <Text className="desc">
                      {project.description || "No description"}
                    </Text>
                  </Box>
                  <ChevronDownIcon w={6} h={8} />
                </Flex>
                <Collapse in={openItems[project.id]} className="collapse">
                  <Flex justify="space-between" align="center">
                    <Stack>
                      <Text fontWeight="600">Created</Text>
                      <Text>{DateFormatter(project.createdAt)}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="500">
                        {project.archived ? "Archived" : "Not archived"}
                      </Text>
                    </Stack>
                    <Link href={project.webUrl} color="blue" isExternal>
                      View on GitLab <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                </Collapse>
              </ListItem>
            );
          })}
        </List>
      );
    }
  };

  return (
    <div>
      {renderPagination()}
      {renderList()}
    </div>
  );
};

export default ProjectList;
