import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import updatePasswordScreen from '../../screens/UpdatePasswordScreen'
import GymsScreen from '../../screens/GymsScreen'
import GymScreen from '../../screens/GymScreen'
import ManageGymScreen from '../../screens/ManageGymScreen'
import AddGymScreen from '../../screens/GymAddScreen'
import EditGymScreen from '../../screens/GymEditScreen'
import DashboardScreen from '../../screens/DashboardScreen'
import ReviewAddScreen from '../../screens/ReviewAddScreen'
import ReviewsScreen from '../../screens/ReviewsScreen'

const Routes = () => {
  return (
    <section className='container py-5'>
      <Switch>
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/register' exact component={RegisterScreen} />
        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/update-password' exact component={updatePasswordScreen} />
        <Route path='/dashboard' exact component={DashboardScreen} />
        <Route path='/gyms' exact component={GymsScreen} />
        <Route path='/search/:keyword' exact component={GymsScreen} />
        <Route path='/page/:pageNumber' exact component={GymsScreen} />
        <Route path='/gyms/:id' exact component={GymScreen} />
        <Route path='/manage-gyms' exact component={ManageGymScreen} />
        <Route path='/add-gym' exact component={AddGymScreen} />
        <Route path='/edit-gym/:id' exact component={EditGymScreen} />
        <Route path='/add-review/gym/:id' exact component={ReviewAddScreen} />
        <Route path='/reviews/gym/:id' exact component={ReviewsScreen} />
      </Switch>
    </section>
  )
}

export default Routes
