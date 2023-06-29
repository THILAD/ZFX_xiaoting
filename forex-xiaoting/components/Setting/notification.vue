<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('notifications')"
    />
    <div class="warper" style="background-color: #ffffff">
      <div
        class="header"
        style="display: flex; justify-content: center; margin-top: 60px"
      >
        <h2>การแจ้งเตือนความเสี่ยง</h2>
      </div>
      <div class="risk-buyandsell" style="padding: 20px">
        <p>คำเตือน: ความเสี่ยงจากการซื้อ-ขายในออนไลน์</p>
        <p style="margin-top: 10px">
          การซื้อ-ขายผ่านระบบออนไลน์มีความเสี่ยง เช่น ความผิดพลาดจากฮาร์ดแวร์,
          ซอฟต์แวร์, การเชื่อมต่ออินเทอร์เน็ตหรือเหตุสุดวิสัยอื่น (เช่น น้ำท่วม,
          สภาพอากาศไม่ปกติ, แผ่นดินไหวหรือเหตุสุดวิสัยอื่น เช่น ไฟไหม้, สงคราม,
          การจลาจล, การก่อกบฏ, การนัดหยุดงาน, อุบัติเหตุ, การดำเนินการของรัฐบาล,
          ความล้มเหลวในการสื่อสารหรือการควบคุม, อุปกรณ์หรือซอฟต์แวร์ไม่ทำงาน)
          ZFX และบริษัทในเครือของเรา (จากนี้จะอ้างถึงโดยเรียกว่า “เรา” หรือ
          “ของเรา”)
          ไม่สามารถควบคุมความแรงของสัญญาณการรับหรือส่งสัญญาณผ่านอินเทอร์เน็ต
          การตั้งค่าอุปกรณ์ของคุณหรือความเชื่อถือได้ของการเชื่อมต่อ
          ดังนั้นเราจึงไม่สามารถรับผิดชอบปัญหาในการเชื่อมต่อ
          ความไม่เสถียรหรือความล่าช้า (แม้เราจะพยายามป้องกันปัญหาในระบบแล้ว)
          โปรดติดต่อเราทันทีหากคุณไม่สามารถเข้าใช้บัญชี
          เราจะดำเนินการตามคำสั่งซื้อ-ขายของคุณทางโทรศัพท์
          แต่คุณต้องผ่านยืนยันตัวตนเพื่อความปลอดภัยก่อนที่เราจะรับคำสั่งซื้อ-ขายของคุณ
          หากเราไม่สามารถระบุตัวตนของคุณเราจะไม่สามารถดำเนินการตามคำสั่งซื้อ-ขายของคุณ
        </p>
      </div>
      <div class="risk-CFD" style="padding: 20px">
        <p>คำเตือน: ความเสี่ยงจากสัญญาซื้อขายส่วนต่าง (CFD)</p>
        <p style="margin-top: 10px">
          สัญญาซื้อขายส่วนต่าง (CFD)
          เป็นเครื่องมือทางการเงินที่ซับซ้อนและมีความเสี่ยงสูง
          คุณจะสูญเงินอย่างรวดเร็วหากคุณใช้เงินที่กู้ยืมมาในการลงทุน (leverage)
          คุณอาจต้องฝากเงินเพิ่มในบัญชีตามข้อกำหนดเงินประกัน
          คุณควรเช็กว่าคุณเข้าใจกลไกการทำงานของสัญญาซื้อขายส่วนต่าง (CFD)
          หรือไม่และคุณสามารถรับความเสี่ยงได้หรือไม่
          การเปลี่ยนแปลงของราคาเป็นผลจากหลายปัจจัยในระดับโลกซึ่งไม่สามารถคาดการณ์ล่วงหน้าได้
          ราคาสัญญาซื้อขายส่วนต่าง (CFD)
          ที่เปลี่ยนแปลงอย่างมากอาจทำให้เกิดปฏิกิริยาในตลาดซึ่งอาจทำให้คุณไม่สามารถชำระมูลค่าที่ขาดทุน
          เจ้าหน้าที่ของ Zeal Capital Market ไม่สามารถรับประกันการคาดการณ์ตลาด
          (หากเจ้าหน้าที่ทำการคาดการณ์ตลาด)
          และไม่สามารถรับประกันระดับการขาดทุนสูงสุด
        </p>
      </div>
      <div class="risk-CFD" style="padding: 20px">
        <p>คำเตือนเกี่ยวกับคำแนะนำทั่วไป</p>
        <p style="margin-top: 10px">
          คำแนะนำทั่วไปที่เราแจ้งคุณหรือคำแนะนำบนเว็บไซต์หรือบนแพลตฟอร์มการซื้อ-ขายไม่ได้พิจารณาสถานะทางการเงิน,
          วัตถุประสงค์หรือความต้องการส่วนตัวของคุณเป็นการเฉพาะ
          การซื้อ-ขายสัญญาซื้อขายส่วนต่าง (CFD) ไม่เหมาะกับลูกค้าทุกท่าน
          เราแนะนำให้คุณฝึกการซื้อ-ขายแบบไม่มีความเสี่ยงบนแพลตฟอร์มตัวอย่างก่อนการลงทุนจริง
          คุณควรพิจารณาวัตถุประสงค์, สถานะทางการเงิน,
          วัตถุประสงค์และความต้องการของคุณ
          และค่อยๆทำความเข้าใจผลการซื้อ-ขายและยุทธศาสตร์ที่สามารถนำมาใช้กับแพลตฟอร์มการซื้อ-ขายจริง
          คุณควรรับคำแนะนำด้านการเงินจากหน่วยงานที่ดำเนินงานอย่างอิสระเพื่อให้แน่ใจว่าผลิตภัณฑ์ทางการเงินนั้นเหมาะกับสถานะทางการเงินและความต้องการของคุณ
        </p>

        <p style="margin-top: 20px">
          คำเตือนด้านความเสี่ยง: การเทรดสัญญาซื้อขายล่วงหน้า (Contracts for
          Difference, CFDs)
          เป็นผลิตภัณฑ์ที่มีความซับซ้อนและมีความเสี่ยงสูงที่ทำให้นักลงทุนสูญเสียเงินทั้งหมดได้
          เนื่องจากการใช้เลเวอเรจ
          คุณอาจจะจำเป็นต้องฝากเงินเพิ่มเติมเพื่อให้มีมาร์จิ้นเพียงพอ
          ดังนั้นคุณจำเป็นต้องพิจารณาและเข้าใจการเทรด CFDs
          และยอมรับความเสี่ยงที่เกิดขึ้นได้
          ที่สำคัญผลการดำเนินงานด้านการเงินในอดีตไม่สามารถยืนยันถึงผลการดำเนินงานในอนาคตได้
          การเทรดสัญญาอนุพันธ์ด้านการเงินอาจจะไม่เหมาะสมกับนักลงทุนทุกคน
          โปรดแน่ใจว่า คุณเข้าใจความเสี่ยงที่เกี่ยวข้องและได้รับคำแนะนำโดยอิสระ
        </p>
        <p style="margin-top: 20px">
          หมายเหตุ : หากเอกสารฉบับนี้มีการตีความเป็นภาษาอื่น
          หรือเกิดข้อพิพาทในการตีความหมาย
          ให้อิงฉบับภาษาอังกฤษมาใช้ในการตีความและตัดสินเป็นหลัก
        </p>
      </div>
    </div>
    <!-- <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#fffffff">mdi-back</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: black; font-weight: bold"
              >Language</v-list-item-title
            >
            <v-icon color="#fffffff">mdi-back</v-icon>
          </v-list-item-content>
          <v-list-item-content align="end">
            <v-list-item-title style="color: #19309f">English</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#19309f">mdi-cash-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: black; font-weight: bold"
              >Currency</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content align="end">
            <v-list-item-title style="color: #19309f">USD</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#19309f">mdi-brightness-4</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: black; font-weight: bold"
              >Theme</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content align="end">
            <v-list-item-title style="color: #19309f">Light</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#19309f">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: black; font-weight: bold"
              >About us</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout">
          <v-list-item-icon>
            <v-icon color="error">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: red; font-weight: bold"
              >Logout</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedItem: 0,
    };
  },
  methods: {
    ...mapActions("authen", ["logout"]),
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$cookies.set("lang", lang);
    },
    onLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>
