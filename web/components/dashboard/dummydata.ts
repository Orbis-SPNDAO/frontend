import { ethers } from "ethers";

export interface OverviewData {
  totalRewards: ethers.BigNumber;
  decryptionSessions: number;
  votesParticipated: number;
  discussions: number;
}

export interface DiscussionData {
  id: number;
  creator: string;
  title: string;
  content: string;
  numberComments: number;
}

export type ProposalData = {
  id: number;
  creator: string;
  title: string;
  description: string;
  options: {
    id: number;
    name: string;
  }[];
  discussions: number[];
  organisation: string;
  ipfs: string;
  votingSystem: VotingSystem;
  start: string;
  end: string;
  snapshot: number;
};

export type VotingSystem = "basic-voting"; // TODO: others?
export type ProposalStatus = "in-progress" | "upcoming" | "closed";

export type ProposalType = ProposalData & {
  startDate: Date;
  endDate: Date;
  getStatus(): ProposalStatus;
  getStatusDisplay(): string;
};

export interface VoteData {
  id: number;
  proposalId: number;
  voter: string;
  option: number;
}

export interface DaoManagementData {
  encryptedCid: string;
  walletAddress: string;
  sessionPayment: number;
  isDecrypted: boolean;
  selected: boolean;
  tokenId: number;
}

export const overviewData: OverviewData = {
  totalRewards: ethers.utils.parseEther("1.27"),
  decryptionSessions: 5,
  votesParticipated: 12,
  discussions: 63,
};

export const discussionData: DiscussionData[] = [
  {
    id: 1,
    creator: ethers.constants.AddressZero,
    title: "Topic 1 xxxxxxxxxxxxxxxxxxxxxxxxxx sadf asdf asd f",
    content:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
    numberComments: 5,
  },
  {
    id: 2,
    creator: ethers.constants.AddressZero,
    title: "Topic 2 xxxxx",
    content: "Lorem ipsum",
    numberComments: 2,
  },
  {
    id: 3,
    creator: ethers.constants.AddressZero,
    title: "Topic 3 xxxxx",
    content: "Lorem ipsum",
    numberComments: 3,
  },
  {
    id: 4,
    creator: ethers.constants.AddressZero,
    title: "Topic 4 xxxxx",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    numberComments: 17,
  },
];

export const proposalData: ProposalData[] = [
  {
    id: 1,
    creator: ethers.constants.AddressZero,
    title: "Proposal 1",
    description:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    options: [
      {
        id: 1,
        name: "Option 1",
      },
      { id: 2, name: "Option 2" },
    ],
    discussions: [1, 3],
    organisation: "SPN DAO",
    ipfs: "cid123456asdfgzxcv",
    votingSystem: "basic-voting",
    start: new Date(new Date().getTime() + 3600 * 24 * 10).toISOString(),
    end: new Date(new Date().getTime() + 3600 * 24 * 10).toISOString(),
    snapshot: 1234,
  },
  {
    id: 2,
    creator: ethers.constants.AddressZero,
    title: "Proposal 2",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    options: [
      {
        id: 1,
        name: "Option 1",
      },
      {
        id: 2,
        name: "Option 2",
      },
      {
        id: 3,
        name: "Option 3",
      },
    ],
    discussions: [2, 4],
    organisation: "EARN DAO",
    ipfs: "cidasdfgzxcv123456",
    votingSystem: "basic-voting",
    start: new Date(new Date().getTime() - 3600 * 24 * 5).toISOString(),
    end: new Date(new Date().getTime() + 3600 * 24 * 10).toISOString(),
    snapshot: 2345,
  },
];

export const voteData: VoteData[] = [
  { id: 1, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 2, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 3, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 4, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 5, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 6, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 7, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 8, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 9, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 10, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 11, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 12, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 13, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 14, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 15, proposalId: 1, voter: ethers.constants.AddressZero, option: 2 },
  { id: 16, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 17, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 18, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 19, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 20, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 21, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 22, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 23, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 24, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 25, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 26, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 27, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 28, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 29, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 30, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 31, proposalId: 1, voter: ethers.constants.AddressZero, option: 1 },
  { id: 32, proposalId: 2, voter: ethers.constants.AddressZero, option: 1 },
  { id: 33, proposalId: 2, voter: ethers.constants.AddressZero, option: 1 },
  { id: 34, proposalId: 2, voter: ethers.constants.AddressZero, option: 1 },
  { id: 35, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 36, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 37, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 38, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 39, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 40, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 41, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 42, proposalId: 2, voter: ethers.constants.AddressZero, option: 2 },
  { id: 43, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
  { id: 44, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
  { id: 45, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
  { id: 46, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
  { id: 47, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
  { id: 48, proposalId: 2, voter: ethers.constants.AddressZero, option: 3 },
];

// export const dummyDaoMgmtData: DaoManagementData[] = [
//   {
//     walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
//     sessionPayment: 0.74,
//     isDecrypted: false,
//     selected: false,
//     tokenId: 0
//   },
//   {
//     walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
//     sessionPayment: 2.68,
//     isDecrypted: true,
//     selected: false,
//     tokenId: 1
//   },
//   {
//     walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
//     sessionPayment: 0.002,
//     isDecrypted: false,
//     selected: false,
//     tokenId: 2
//   },
//   {
//     walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
//     sessionPayment: 1.28,
//     isDecrypted: true,
//     selected: false,
//     tokenId: 3
//   }
// ];
