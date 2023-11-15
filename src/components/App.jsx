import React, { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import css from './app.module.css';
export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = option => {
    this.setState(prevState => {
      return { [option]: prevState[option] + 1 };
    });
  };

  countTotalFeedback = () => {
    const total = this.state.good + this.state.neutral + this.state.bad;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const feedBack = (this.state.good / this.countTotalFeedback()) * 100;
    return feedBack;
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div className={css.statistics}>
        <Section>
          <h2>Please leave feedback</h2>
        </Section>
        <FeedbackOptions
          options={Object.keys(this.state)}
          onLeaveFeedback={this.onLeaveFeedback}
        />
        {good + neutral + bad === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Section>
            <h2>Statistics</h2>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage().toFixed()}
            />
          </Section>
        )}
      </div>
    );
  }
}
