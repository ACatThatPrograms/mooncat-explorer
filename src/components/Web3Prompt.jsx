Web3Prompt() {
    return (

        <Segment color="orange">
          <Header>Hold up!</Header>
            You need to connect with a Web3 wallet to check out your mooncat!
          </Segment>

        <Segment>
          <Button color="green" content="Connect Web3" onClick={connect} loading={loading} />
        </Segment>

        {web3Err ? (
          <Segment color="red">
            {web3Err}
          </Segment>
        ) : null}

}