package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.config.EmbedMongoClientOverrideConfig;
import java.util.List;
import java.util.Optional;
import javax.annotation.Resource;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Test Inventory DAO.
 */
@ContextConfiguration(classes = {EmbedMongoClientOverrideConfig.class})
@DataMongoTest
@RunWith(SpringRunner.class)
public class InventoryDAOTest {
  @Resource
  private MongoTemplate mongoTemplate;
  private InventoryDAO inventoryDAO;
  private static final String NAME = "Amber";
  private static final String PRODUCT_TYPE = "hops";

  @Before
  public void setup() {
    this.inventoryDAO = new InventoryDAO(this.mongoTemplate);
  }

  @After
  public void tearDown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test Find All method.
   */
  @Test
  public void findAll() {
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    this.mongoTemplate.save(inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    Assert.assertFalse(actualInventory.isEmpty());
  }

  /**
   * Test Create method. Check that the argument Inventory is present in the
   * Mongo collection.
   */
  @Test
  public void create() {
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    this.inventoryDAO.create(inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    //Assert that the list of inventory is not empty
    Assert.assertFalse(actualInventory.isEmpty());
    //Assert that the retrieved inventory does not have a null id
    Assert.assertFalse(actualInventory.get(0).getId().equals(null));
  }

  /**
   * Test Delete method. Check that the argument Inventory is returned when
   * deleted and that the Mongo collection size reflects the deletion.
   */
  @Test
  public void deletePresent() {
    int sizeBefore = 0;
    int sizeAfter = 0;

    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);

    this.inventoryDAO.create(inventory);
    //Number of present Inventory before the successful 'delete' operation
    sizeBefore = this.mongoTemplate.findAll(Inventory.class).size();
    //Attempt to delete an inserted Inventory via the the inserted Inventory's
    //Mongo-provided ID
    Optional<Inventory> actualInventory = this.inventoryDAO.delete(inventory.getId());
    //Number of present Inventory after the successful 'delete' operation
    sizeAfter = this.mongoTemplate.findAll(Inventory.class).size();

    //Assert that the returned inventory is not null
    Assert.assertTrue(actualInventory.isPresent());
    //Assert that the returned inventory has the same ID as the argument String
    Assert.assertTrue(actualInventory.get().getId().equals(inventory.getId()));
    //Assert that the number of the Mongo collection for this class is
    //decremented by 1 after a successful deletion.
    Assert.assertTrue(sizeAfter == (sizeBefore - 1));
  }

  /**
   * Test Delete method. Check that an empty Optional is returned when deletion
   * deletion is unsuccessful and that the Mongo collection size stays the same
   * after the failed deletion.
   */
  @Test
  public void deleteAbsent() {
    int sizeBefore = 0;
    int sizeAfter = 0;

    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);

    this.inventoryDAO.create(inventory);
    //Number of present Inventory before the failed 'delete' operation
    sizeBefore = this.mongoTemplate.findAll(Inventory.class).size();
    //Attempt to delete an inserted Inventory via an empty String ID, which we
    //know that Mongo does not provide as an ObjectId.
    Optional<Inventory> actualInventory = this.inventoryDAO.delete(new String());
    //Number of present Inventory after the failed 'delete' operation
    sizeAfter = this.mongoTemplate.findAll(Inventory.class).size();

    //Assert that the returned inventory is null
    Assert.assertFalse(actualInventory.isPresent());
    //Assert that the number of the Mongo collection for this class stays the
    //same after a failed deletion.
    Assert.assertTrue(sizeBefore == sizeAfter);
  }
}
