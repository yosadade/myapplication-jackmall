import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, CustomModal, Gap, List} from '../../components';
import {colors} from '../../utils';
import {ICDown, ICUp} from '../../assets';
import Axios from 'axios';
import {showMessage} from 'react-native-flash-message';

const Home = () => {
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [dataModal, setDataModal] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState('Any');
  const [amount, setAmount] = useState(2);
  const [btn, setBtn] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [connection, setConnection] = useState(true);

  useEffect(() => {
    getDataListView();
  }, []);

  const getDataListView = () => {
    const datas = Axios.get('https://v2.jokeapi.dev/categories')
      .then(res => {
        const newData = res.data.categories;
        setData(newData);
      })
      .catch(() => {
        setConnection(false);
        showMessage({
          message: 'Failed to fetching data, please check your connection',
          type: 'danger',
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        });
      });
    return () => datas;
  };

  const getDataChildListView = () => {
    const datas = Axios.get(
      `https://v2.jokeapi.dev/joke/Any?type=single&amount=${amount}`,
    )
      .then(res => {
        const newData = res?.data?.jokes;
        setChildData(newData);
      })
      .catch(() => {
        showMessage({
          message: 'Failed to fetching data, please check your connection',
          type: 'danger',
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        });
      });

    return () => datas;
  };

  const onHandleShowChild = item => {
    getDataChildListView();
    setCurrent(item);
    setAmount(2);
    setBtn(true);
    setIsShow(!isShow);
  };

  const onHandleAddData = () => {
    if (amount < 6) {
      setAmount(amount + 2);
    } else {
      setBtn(false);
    }
    getDataChildListView();
  };

  const onHandleShowModal = joke => {
    setDataModal(joke);
    setModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setAmount(2);
    getDataListView();
    getDataChildListView();
    setBtn(true);
    setRefreshing(false);
  };

  const onHandleGoTop = item => {
    setCurrent(item);
    setIsShow(false);
    setAmount(2);
    getDataChildListView();
    setBtn(true);
  };

  return (
    <>
      <View style={styles.page}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Gap height={24} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.title}>My Application</Text>
          {!connection ? (
            <View style={styles.wrapperLoading}>
              <Text style={styles.titleLoading}>No Internet</Text>
            </View>
          ) : !data || data.length < 1 ? (
            <View style={styles.wrapperLoading}>
              <Text style={styles.titleLoading}>Fetching data...</Text>
              <ActivityIndicator size={25} color={colors.red} />
            </View>
          ) : (
            data.map((item, i) => {
              return (
                <View key={i}>
                  <View style={styles.list}>
                    <Text style={styles.titleList}>{`${i + 1}. ${
                      i === 0 ? current : item
                    }`}</Text>
                    <View style={styles.buttonList}>
                      <Button
                        type={i === 0 ? 'top' : ''}
                        onPress={() => onHandleGoTop(item)}
                      />
                      <Gap width={15} />
                      <Button
                        type="toggle"
                        icon={
                          isShow && current === item ? <ICUp /> : <ICDown />
                        }
                        onPress={() => onHandleShowChild(item)}
                      />
                    </View>
                  </View>
                  {isShow && current === item && (
                    <View>
                      {!childData || childData.length < 1 ? (
                        <ActivityIndicator
                          style={styles.loadingChild}
                          size={20}
                          color={colors.red}
                        />
                      ) : (
                        childData.map(child => {
                          const {id, joke} = child;
                          if (!child) {
                            return null;
                          }
                          return (
                            <List
                              key={id}
                              title={joke}
                              onPress={() => onHandleShowModal(joke)}
                            />
                          );
                        })
                      )}
                      {btn && (
                        <Button type="add-data" onPress={onHandleAddData} />
                      )}
                      <Gap height={48} />
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      {isModalVisible && (
        <CustomModal
          title={dataModal}
          isVisible={true}
          onPress={() => setModalVisible(!isModalVisible)}
        />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    letterSpacing: 2,
    color: colors.black,
    textAlign: 'center',
    fontWeight: '700',
  },
  list: {
    marginTop: 24,
    padding: 12,
    borderWidth: 0.2,
    borderColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
  },
  titleList: {
    fontSize: 14,
    letterSpacing: 2,
    color: colors.black,
    fontWeight: '700',
  },
  buttonList: {
    flexDirection: 'row',
  },
  wrapperLoading: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLoading: {
    fontSize: 14,
    letterSpacing: 2,
    marginRight: 12,
    color: colors.red,
    fontWeight: '700',
  },
  loadingChild: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
});
