import {
  ProposalData,
  VotingSystem,
} from "./../components/dashboard/dummydata";
import { ProposalType } from "../components/dashboard/dummydata";

export default class Proposal implements ProposalType {
  id: number;
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

  startDate: Date;
  endDate: Date;
  snapshot: number;

  constructor(proposalData: ProposalData) {
    this.id = proposalData.id;
    this.title = proposalData.title;
    this.description = proposalData.description;
    this.options = proposalData.options;
    this.discussions = proposalData.discussions;
    this.organisation = proposalData.organisation;
    this.ipfs = proposalData.ipfs;
    this.votingSystem = proposalData.votingSystem;
    this.start = proposalData.start;
    this.end = proposalData.end;
    this.snapshot = proposalData.snapshot;

    this.startDate = new Date(proposalData.start);
    this.endDate = new Date(proposalData.end);
  }

  getStatus() {
    const status =
      this.endDate < new Date()
        ? "closed"
        : this.startDate > new Date()
        ? "upcoming"
        : "in-progress";

    return status;
  }

  getStatusDisplay() {
    const statusDisplay = this.getStatus()
      .split("-")
      .map((s: string) => s[0].toUpperCase() + s.slice(1))
      .join(" ");

    return statusDisplay;
  }
}
