import { AiFillLinkedin } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'

export default function Footer() {
    return (
        <footer className="footer navbar fixed-bottom pt-3" style={{ marginTop: '2.5rem' }}>
            <p className='center' style={{ color: 'black', fontSize: '14px' }}><span style={{ display: 'align-center', color: 'white', fontSize: '15px' }}>Website Created By: </span>
                Clair Choo <a href="https://www.linkedin.com/in/clair-choo/" target="_blank"><AiFillLinkedin /></a><a href="http://github.com" target="_blank"><AiFillGithub /></a> ||
                Jon Dimaculangan <a href="https://www.linkedin.com/in/jon-dmclngn/" target="_blank"><AiFillLinkedin /></a><a href="http://github.com" target="_blank"><AiFillGithub /></a> ||
                Nate Chesmar <a href="https://www.linkedin.com/in/nathan-chesmar/" target="_blank"><AiFillLinkedin /></a><a href="http://github.com" target="_blank"><AiFillGithub /></a> ||
                Marty Vanzo <a href="https://www.linkedin.com/in/marty-vanzo/" target="_blank"><AiFillLinkedin /></a><a href="http://github.com" target="_blank"><AiFillGithub /></a>
            </p>
        </footer>
    )
}