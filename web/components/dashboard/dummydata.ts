import { ProposalData } from "./dummydata";
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
  proposalId: number;
  voter: string;
  option: number;
}

export interface DaoManagementData {
  walletAddress: string;
  sessionPayment: number;
  isDecrypted: boolean;
  selected: boolean;
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
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
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
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 1,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 1,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 2,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
  {
    proposalId: 2,
    voter: ethers.constants.AddressZero,
    option: 3,
  },
];

export const dummyDaoMgmtData: DaoManagementData[] = [
  {
    walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 0.74,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
    sessionPayment: 2.68,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
    sessionPayment: 0.002,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 1.28,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 0.74,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
    sessionPayment: 2.68,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
    sessionPayment: 0.002,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 1.28,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 0.74,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
    sessionPayment: 2.68,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
    sessionPayment: 0.002,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 1.28,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 0.74,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
    sessionPayment: 2.68,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
    sessionPayment: 0.002,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 1.28,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x1zP1e93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 0.74,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x8ef1e93G8TbCc68s4w8B3rt58gs30GT097Dif799",
    sessionPayment: 2.68,
    isDecrypted: true,
    selected: false,
  },
  {
    walletAddress: "0x6e2fe93G8TbCc68s4w8B3rt58gs30GT097Dif7yn",
    sessionPayment: 0.002,
    isDecrypted: false,
    selected: false,
  },
  {
    walletAddress: "0x85fwe93G8TbCc68s4w8B3rt58gs30GT097Dif751",
    sessionPayment: 1.28,
    isDecrypted: true,
    selected: false,
  },
];
