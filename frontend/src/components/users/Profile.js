import React from 'react'
import ProfileMap from './ProfileMap'
import ColorTheme from '../../../src/ColorTheme'
import { Link } from 'react-router-dom'
import { popupNotification } from '../../lib/notification'
import { getUser, followUser } from '../../lib/api'
import { getUserId } from '../../lib/auth'

import { ThemeProvider } from '@material-ui/core/styles'
import { Container, Grid, Divider, Box, ButtonBase, Typography, ButtonGroup, Button, Avatar, GridListTile, GridList, GridListTileBar } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AppsIcon from '@material-ui/icons/Apps'
import RoomIcon from '@material-ui/icons/Room'

class Profile extends React.Component {
  state = { 
    data: [],
    user: null,
    hideMap: true,
    hideGrid: false,
    isViewersProfile: false,
    isFollowing: false
  }

  async componentDidMount() {
    try {
      const resUser = await getUser(this.props.match.params.id)
      // console.log('this.props etc', this.props.match.params.id, getUserId())
      this.setState({ 
        user: resUser.data, 
        isViewersProfile: parseInt(this.props.match.params.id) === getUserId(), 
        isFollowing: this.checkIsFollowing(resUser) 
      })
    } catch (err) {
      console.log(err)
      popupNotification('Login to access Profiles')
      this.props.history.push('/login')

    }
  }

  checkIsFollowing = resUser => {
    return resUser.data.followers.some(followerId => { 
      return followerId === getUserId() 
    })
  }

  handleDisplayCard = e => {
    e.preventDefault()
    console.log('clicked', e.target)
    if (e.currentTarget.name === 'showGrid') {
      this.setState({ hideMap: true, hideGrid: false })
      console.log(e.target.name)
    } else {
      this.setState({ hideMap: false, hideGrid: true })
    }
  }

  handleFollow = async e => {
    e.preventDefault()

    try {
      await followUser(this.props.match.params.id)
      const resUser = await getUser(this.props.match.params.id)
      this.setState({ 
        user: resUser.data, 
        isFollowing: this.checkIsFollowing(resUser) 
      })

    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname.includes('/profile/') && this.props.location.pathname.includes('/profile/')) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        const id = this.props.match.params.id
        const res = await getUser(id)
        this.setState({ user: res.data })
      }
    }
  }

  render() {
    console.log('Are you this person?', this.state.isViewersProfile)
    console.log('Are you following?', this.state.isFollowing)

    const { user } = this.state

    if (!user) return null
  
    return (
      <ThemeProvider theme={ColorTheme}>
        <Container maxWidth="md" spacing={4}>
          <Box component="span" className="profile-info">
            <div className="profile-info">
              <Grid className="profile-photo-followers">
                <Grid item md container direction="row">
                  <ButtonBase className="profile-image">
                    <Avatar 
                      alt="Userprofilephoto" 
                      src={user.profile_image} 
                      className="profile-avatar"
                      style={{
                        width: '130px',
                        height: '130px', 
                        margin: '10px' }}
                    />
                  </ButtonBase>
                  {this.state.isViewersProfile &&                 
                  <ButtonBase className="edit profile">
                    <Link to={`/profile/${user.id}/edit`}>
                      <EditIcon 
                        color="primary"
                        style={{
                          margin: '10px'
                        }}/>
                    </Link>
                  </ButtonBase>}
                  <Grid 
                    item xs container 
                    direction="column" 
                    style={{
                      padding: '10px'
                    }}>
                    <Typography 
                      color="primary" 
                      className={ColorTheme.typography}
                      style={{
                        fontSize: '26px',
                        fontFamily: 'Libre Baskerville'
                      }}>
                      @{user.username}
                    </Typography>
                    <Typography 
                      varient="subtitle1" 
                      color="primary"
                      style={{
                        fontSize: '20px'
                      }}>
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography varient="subtitle2" color="primary">
                    📍 London, UK
                      <br />
                    📷 Fuji XT1 | Canon AV-1
                      <br />
                    😎 I like taking photos
                    </Typography>
                    <br />
                  </Grid>
                  <Divider />
                </Grid>
              </Grid>
              <div className="follow-button">
                {this.state.isViewersProfile &&  
                <Link to={`/profile/${user.id}/addNewPhoto`}>
                  <Button 
                    size="medium" 
                    fullWidth 
                    variant="outlined" 
                    color="primary" 
                    style={{
                      marginBottom: '5px',
                      fontSize: '15px',
                      letterSpacing: '5px'
                    }}>
                    Add Your Photo
                  </Button>
                </Link> 
                }
                {!this.state.isViewersProfile &&
                <Grid item xs container direction="row">
                  <Button 
                    size="medium" 
                    fullWidth 
                    variant="outlined" 
                    color="primary"
                    style={{
                      marginBottom: '5px',
                      fontSize: '15px',
                      letterSpacing: '5px'
                    }} 
                    onClick={this.handleFollow}>
                    {this.state.isFollowing ? '• UNFOLLOW •' : '• FOLLOW •'}
                  </Button>
                </Grid>
                }
              </div>
              <div className="follow-info">
                <Grid 
                  item 
                  xs 
                  container 
                  direction="row" 
                  className="followers"
                  style={{
                    padding: '8px'
                  }}>
                  <Grid item xs>
                    <Typography 
                      color="primary"
                      style={{
                        fontSize: '18px',
                        textAlign: 'center',
                        fontFamily: 'Libre Baskerville'
                      }}>
                      {user.created_photo.length} <br /> Posts
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography 
                      varient="p" 
                      color="primary"
                      style={{
                        fontSize: '18px',
                        fontFamily: 'Libre Baskerville',
                        textAlign: 'center'
                      }}>
                      {user.followers.length} <br /> Followers
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography 
                      varient="p" 
                      color="primary"
                      style={{
                        fontSize: '18px',
                        fontFamily: 'Libre Baskerville',
                        textAlign: 'center'
                      }}>
                      {user.following.length} <br /> Following
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Box>
          <br />
          <Divider />
          <Box component="span" className="view-buttons">
            <ButtonGroup color="primary" aria-label="text primary button group">
              <Button name="showGrid" onClick={this.handleDisplayCard}>
                <AppsIcon/>
              </Button>
              <Button name="showMap" onClick={this.handleDisplayCard}>
                <RoomIcon/>
              </Button>
            </ButtonGroup>
          </Box>
          <br />
          <Box className="test">
            <div className="test">
              <section 
                className={`${this.state.hideGrid ? 'section spot-grid is-hidden' : 'spot-grid'}`}>
                <GridList cellHeight={300} className="test">
                  <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  </GridListTile>
                  {user.created_photo.map((tile) => (
                    <GridListTile key={tile.image}>
                      <Link to={`/photos/${tile.id}`}>
                        <img src={tile.image} alt={tile.title} />
                        <GridListTileBar
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Libre Baskerville'
                          }}
                          title={tile.location}
                        />
                      </Link>
                    </GridListTile>
                  ))}
                </GridList>
              </section>
              <section className={`${this.state.hideMap ? 'section spot-map is-hidden' : 'spot-map'}`}>
                <ProfileMap />
              </section>
            </div>
          </Box>
        </Container>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </ThemeProvider>
    )
  }
}

export default Profile 