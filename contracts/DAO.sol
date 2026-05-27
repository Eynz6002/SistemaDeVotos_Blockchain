// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DAO {
    address public admin;
    mapping(address => bool) public members;
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        address creator;
        mapping(address => bool) voted;
    }

    event MemberAdded(address member);
    event ProposalCreated(uint256 id, string description, address creator);
    event Voted(uint256 proposalId, address voter);

    modifier onlyAdmin() {
        require(msg.sender == admin, "DAO: apenas o admin pode executar esta acao");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "DAO: apenas membros podem executar esta acao");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addMember(address _newMember) external onlyAdmin {
        require(_newMember != address(0), "DAO: endereco invalido");
        require(!members[_newMember], "DAO: endereco ja e membro");
        members[_newMember] = true;
        emit MemberAdded(_newMember);
    }

    function createProposal(string memory _description) external onlyMember {
        require(bytes(_description).length > 0, "DAO: descricao nao pode ser vazia");
        uint256 proposalId = proposalCount;
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.description = _description;
        newProposal.voteCount = 0;
        newProposal.creator = msg.sender;
        proposalCount++;
        emit ProposalCreated(proposalId, _description, msg.sender);
    }

    function vote(uint256 _proposalId) external onlyMember {
        require(_proposalId < proposalCount, "DAO: proposta nao existe");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voted[msg.sender], "DAO: membro ja votou nesta proposta");
        proposal.voted[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(_proposalId, msg.sender);
    }

    function getProposalDetails(uint256 _proposalId)
        external
        view
        returns (
            string memory description,
            uint256 voteCount,
            address creator
        )
    {
        require(_proposalId < proposalCount, "DAO: proposta nao existe");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.creator);
    }
}
