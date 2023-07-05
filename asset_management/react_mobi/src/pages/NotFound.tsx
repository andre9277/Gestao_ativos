import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  useIonViewWillEnter,
} from '@ionic/react';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './NotFound.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}
interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps {}

const Tutorial: React.FC<TutorialProps> = ({
  history,
  setHasSeenTutorial,
  setMenuEnabled,
}) => {
  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={startApp}>
              Voltar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="slider">
          <section>
            <div className="swiper-item">
              <img
                src="assets/img/ica-slidebox-img-1.png"
                alt=""
                className="slide-image"
              />
              <h2 className="slide-title">
                Página não encontrada
              </h2>
              <p>
                Tente novamente!
              </p>
            </div>
          </section>
         
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setHasSeenTutorial,
    setMenuEnabled,
  },
  component: Tutorial,
});
